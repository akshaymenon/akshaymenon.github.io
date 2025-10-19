// Testimonial data (replace with your own testimonials)
const testimonials = [
    {
        imgSrc: 'img/testimonials/soham.jpg',
        text: 'I\'ve worked with Akshay and I must say he is a brilliant programmer and a very sharp learner. No matter what challenges you throw at him, he has always managed to find a solution and doesn\'t give up until closure. Any team leader would be extremely benefitted having him on the team. Good luck for all your future endeavours. ',
        author: 'Soham Dasgupta',
        company: 'Director, Software Engineering'
    },
    {
        imgSrc: 'img/testimonials/nitisha.jpg',
        text: 'His journey with our team started, only because of his ability to stand out in the crowd and our assessment of his potential never went wrong through his journey in Deloitte. He can juggle multiple responsibilities and seamlessly at that. Always had an outlook of providing long term solutions for any assignment given. Keep up the good work and all the best!',
        author: 'Nitisha Prakash',
        company: 'Associate Director, India Operations'
    },
    {
        imgSrc: 'img/testimonials/vivek.jpg',
        text: 'Akshay is one of the most driven and passionate person I have ever worked with. When speaking with him, you can immediately tell that he loves his job and has a way of energizing others around him. Akshay is “big picture” and always helps the team and firm to stay focused on results without getting lost in specific tasks. My experience at Deloitte over the past is a testament to Akshay\'s enthusiasm and focus. ',
        author: 'Vivek Agarwal',
        company: 'Senior Business Analyst'
    },
    {
        imgSrc: 'img/testimonials/suryansh.jpg',
        text: 'Akshay has a comprehensive knowledge in his field. He is an outcome oriented, action driven individual who would go the extra mile to impress the stakeholders. He has a great thought leadership which would prove as a viable asset for a team or an organization. As a team member or a co-worker he inspired me and earned respect.',
        author: 'Suryansh Srivastava',
        company: 'Software Engineer III'
    }    
];

/**
 * Builds a single testimonial element from the provided data.
 * Using DOM APIs instead of string concatenation protects against accidental HTML injection.
 */
function buildTestimonial(testimonial) {
    const wrapper = document.createElement('div');
    wrapper.className = 'testimonial';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'img';

    const image = document.createElement('img');
    image.src = testimonial.imgSrc;
    image.alt = testimonial.author;
    image.loading = 'lazy';
    image.decoding = 'async';
    imageWrapper.appendChild(image);

    const textWrapper = document.createElement('div');
    textWrapper.className = 'text';
    const testimonialText = document.createElement('p');
    testimonialText.textContent = testimonial.text;
    textWrapper.appendChild(testimonialText);

    const authorInfo = document.createElement('div');
    authorInfo.className = 'author-info';

    const authorName = document.createElement('h4');
    authorName.className = 'author';
    authorName.textContent = testimonial.author;

    const authorCompany = document.createElement('h5');
    authorCompany.className = 'company';
    authorCompany.textContent = testimonial.company;

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'icon';
    const quoteIcon = document.createElement('i');
    quoteIcon.className = 'fas fa-quote-right';
    quoteIcon.setAttribute('aria-hidden', 'true');
    iconWrapper.appendChild(quoteIcon);

    authorInfo.appendChild(authorName);
    authorInfo.appendChild(authorCompany);
    authorInfo.appendChild(iconWrapper);

    wrapper.appendChild(imageWrapper);
    wrapper.appendChild(textWrapper);
    wrapper.appendChild(authorInfo);

    return wrapper;
}

// Function to dynamically generate testimonials
function generateTestimonials() {
    const testimonialContainer = document.getElementById('testimonial-carousel');

    if (!testimonialContainer) {
        return;
    }

    // Loop through testimonials and render each entry
    testimonials.forEach((testimonial) => {
        testimonialContainer.appendChild(buildTestimonial(testimonial));
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateTestimonials);
} else {
    generateTestimonials();
}
