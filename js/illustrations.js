(() => {
  "use strict";

  const root = document.documentElement;
  const artwork = new Map();
  const decodedImages = new Map();

  function decodeImage(source) {
    if (!decodedImages.has(source)) {
      const image = new Image();
      image.src = source;
      decodedImages.set(source, image.decode().then(() => true, () => false));
    }
    return decodedImages.get(source);
  }

  function paintArt(art, source) {
    const { element, image, baseSource } = art;
    if (image.src !== source) image.src = source;
    element.style.setProperty("--art-image", `url(${JSON.stringify(source)})`);
    element.setAttribute("data-masked", "");
    element.toggleAttribute("data-variant", source !== baseSource);
  }

  function syncVariant(art) {
    if (!art.image.complete || !art.image.naturalWidth) return;

    const phase = root.getAttribute(`data-${art.element.dataset.place}-phase`);
    const variant = art.element.getAttribute(`data-${phase}-src`);
    const source = variant ? new URL(variant, document.baseURI).href : art.baseSource;
    if (source === art.requestedSource) return;

    art.requestedSource = source;
    paintArt(art, art.baseSource);
    if (source !== art.baseSource) {
      decodeImage(source).then((ready) => {
        if (ready && art.requestedSource === source) paintArt(art, source);
      });
    }
  }

  function registerArt(element) {
    const image = element.firstElementChild;
    const art = { element, image, baseSource: image.src };
    artwork.set(element, art);
    const onLoad = () => {
      paintArt(art, image.src);
      syncVariant(art);
    };
    image.addEventListener("load", onLoad);
    if (image.complete && image.naturalWidth) onLoad();
  }

  function cloneArt(element) {
    const copy = element.cloneNode(true);
    copy.removeAttribute("data-masked");
    copy.removeAttribute("data-variant");
    copy.firstElementChild.loading = "eager";
    copy.firstElementChild.src = artwork.get(element).baseSource;
    return copy;
  }

  function phaseForHour(hour) {
    if (hour < 5 || hour >= 20) return "night";
    if (hour < 8) return "dawn";
    if (hour < 17) return "day";
    return "dusk";
  }

  function startClocks() {
    const row = document.querySelector(".clock-row");
    const button = row.querySelector("button");
    const requestedPhase = new URLSearchParams(location.search).get("time");
    const forcedPhase = ["dawn", "day", "dusk", "night"].includes(requestedPhase) ? requestedPhase : null;
    const zones = { kochi: "Asia/Kolkata", london: "Europe/London" };
    const clocks = Object.entries(zones).map(([place, timeZone]) => ({
      place,
      element: row.querySelector(`[data-clock="${place}"]`),
      formatter: new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }),
    }));
    let timer;
    let paused = false;

    function tick() {
      clearTimeout(timer);
      if (paused || document.hidden) return;

      const now = new Date();
      for (const { place, element, formatter } of clocks) {
        const local = formatter.format(now);
        const [hours, minutes] = local.split(":");
        const hour = Number(hours);
        element.dateTime = local;
        element.textContent = `${hour % 12 || 12}:${minutes}${hour < 12 ? "am" : "pm"}`;

        const attribute = `data-${place}-phase`;
        const phase = forcedPhase ?? phaseForHour(hour);
        if (root.getAttribute(attribute) !== phase) {
          root.setAttribute(attribute, phase);
          for (const art of artwork.values()) {
            if (art.element.dataset.place === place) syncVariant(art);
          }
        }
      }
      row.hidden = false;
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    }

    button.addEventListener("click", () => {
      paused = !paused;
      root.classList.toggle("updates-paused", paused);
      button.textContent = paused ? "Resume updates" : "Pause updates";
      tick();
    });
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("pageshow", tick);
    tick();
  }

  function swayPalm() {
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    if (!motion.matches || !CSS.supports("clip-path", "polygon(0 0, 100% 0, 0 100%)")) return;

    const porch = document.querySelector(".porch");
    decodeImage(artwork.get(porch).baseSource).then((ready) => {
      if (!ready || !motion.matches) return;
      const palm = cloneArt(porch);
      palm.classList.replace("porch", "palm-layer");
      porch.before(palm);
      registerArt(palm);
      porch.parentElement.classList.add("palm-ready");
    });
  }

  function startStage() {
    if (!("IntersectionObserver" in window)) return;

    const chapters = document.querySelector(".chapters");
    const stage = chapters.querySelector(".scene-stage");
    const entries = [...chapters.querySelectorAll("[data-scene]")];
    const sources = new Map();
    for (const entry of entries) {
      const band = entry.querySelector(":scope > .scene-band");
      if (band) sources.set(entry.dataset.scene, band);
    }
    const desktop = matchMedia("(min-width: 1024px)");
    const layers = new Map();
    let observer;
    let wanted;
    let frame;
    let followingTail = false;

    async function displayScene(name) {
      if (name === wanted) return;
      wanted = name;
      const band = sources.get(name);
      const ready = await decodeImage(artwork.get(band).baseSource);
      if (wanted !== name || !desktop.matches) return;
      if (!ready) {
        chapters.classList.remove("has-stage");
        return;
      }
      chapters.classList.add("has-stage");

      let layer = layers.get(name);
      if (!layer) {
        layer = cloneArt(band);
        layer.classList.replace("scene-band", "stage-scene");
        stage.append(layer);
        registerArt(layer);
        layers.set(name, layer);
        // Give the new layer a rendered frame at zero opacity.
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      }
      if (wanted !== name || !desktop.matches) return;
      stage.querySelector(".is-current")?.classList.remove("is-current");
      layer.classList.add("is-current");
      stage.dataset.activeScene = name;
    }

    function scrollRemaining() {
      return root.scrollHeight - window.scrollY - window.innerHeight;
    }

    function selectScene() {
      const height = window.innerHeight;
      // Near the footer, let the reading line reach entries with little scroll left.
      const line = Math.max(height * 0.45, height - Math.max(24, scrollRemaining() * 1.5));
      let current = entries[0];
      for (const entry of entries) {
        if (entry.getBoundingClientRect().top > line + 1) break;
        current = entry;
      }
      displayScene(current.dataset.scene);
    }

    function connectStage() {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      frame = undefined;
      followingTail = false;
      if (!desktop.matches) {
        wanted = undefined;
        chapters.classList.remove("has-stage");
        return;
      }

      chapters.classList.add("has-stage");
      const height = window.innerHeight;
      observer = new IntersectionObserver(selectScene, {
        rootMargin: `-${Math.floor(height * 0.4)}px 0px -${Math.round(height * 0.55)}px 0px`,
      });
      entries.forEach((entry) => observer.observe(entry));
      selectScene();
    }

    window.addEventListener("resize", connectStage);
    window.addEventListener("scroll", () => {
      if (!desktop.matches || !chapters.classList.contains("has-stage")) return;
      const inTail = scrollRemaining() < window.innerHeight * 0.37;
      if ((inTail || followingTail) && frame === undefined) {
        frame = requestAnimationFrame(() => {
          frame = undefined;
          selectScene();
        });
      }
      followingTail = inTail;
    }, { passive: true });
    connectStage();
  }

  document.querySelectorAll(".art[data-place]").forEach(registerArt);
  startClocks();
  swayPalm();
  startStage();
})();
