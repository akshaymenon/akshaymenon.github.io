(() => {
  "use strict";

  const root = document.documentElement;
  const decodedImages = new Map();

  function decodeImage(source) {
    if (!decodedImages.has(source)) {
      const image = new Image();
      image.src = source;
      decodedImages.set(source, image.decode().then(() => true, () => false));
    }
    return decodedImages.get(source);
  }

  function swayPalm() {
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    if (!motion.matches || !CSS.supports("clip-path", "polygon(0 0, 100% 0, 0 100%)")) return;

    const porch = document.querySelector(".porch");
    decodeImage(porch.firstElementChild.src).then((ready) => {
      if (!ready || !motion.matches) return;
      const palm = porch.cloneNode(true);
      palm.classList.replace("porch", "palm-layer");
      porch.before(palm);
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
      const ready = await decodeImage(band.firstElementChild.src);
      if (wanted !== name || !desktop.matches) return;
      if (!ready) {
        chapters.classList.remove("has-stage");
        return;
      }
      chapters.classList.add("has-stage");

      let layer = layers.get(name);
      if (!layer) {
        layer = band.cloneNode(true);
        layer.firstElementChild.loading = "eager";
        layer.classList.replace("scene-band", "stage-scene");
        stage.append(layer);
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

  swayPalm();
  startStage();
})();
