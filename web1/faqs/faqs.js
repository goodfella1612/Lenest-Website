
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const isActive = element.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-question').forEach(question => {
        if (question !== element) {
            question.classList.remove('active');
            question.parentElement.querySelector('.faq-answer').classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    if (isActive) {
        element.classList.remove('active');
        faqAnswer.classList.remove('active');
    } else {
        element.classList.add('active');
        faqAnswer.classList.add('active');
    }
}

// Close FAQ when clicking outside
document.addEventListener('click', function(event) {
    const faqsContainer = document.querySelector('.faqs-container');
    if (!faqsContainer.contains(event.target)) {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.classList.remove('active');
            question.parentElement.querySelector('.faq-answer').classList.remove('active');
        });
    }
});
