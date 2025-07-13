document.addEventListener('DOMContentLoaded', function() {

    // 1. Lógica para o Menu Móvel e Dropdown
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');

    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        const dropdown = nav.querySelector('.dropdown');
        if (dropdown) {
            const dropdownLink = dropdown.querySelector('a');
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.nextElementSibling.classList.toggle('show');
                }
            });
        }
    }

    // 2. Lógica para fechar o menu móvel ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('active') && !nav.contains(e.target) && !mobileMenu.contains(e.target)) {
            nav.classList.remove('active');
            mobileMenu.classList.remove('open');
        }
    });

    // 3. Lógica do Visualizador de Imagens em Tela Inteira
    const modal = document.getElementById('imageModal');
    if (modal) {
        const modalImg = document.getElementById('modalImageContent');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const clickableImages = document.querySelectorAll('.clickable-image');

        const openModal = (imgElement) => {
            modal.style.display = 'flex';
            modalImg.src = imgElement.src;
            modalImg.alt = imgElement.alt;
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        };

        clickableImages.forEach(img => {
            img.addEventListener('click', () => openModal(img));
        });

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(); });
    }

    // 4. Lógica para mudar o estilo do Cabeçalho ao rolar
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.backgroundColor = (window.scrollY > 50) ? '#2c5530' : '';
        });
    }
    
    // 5. Atalhos de clique para rolagem suave para seções na mesma página
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView();
                }
            }
        });
    });

    // 6. Lógica do Formulário de Contato
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        const feedbackElement = document.querySelector('.form-feedback');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;

            if (!name.trim() || !message.trim()) {
                if(feedbackElement) {
                    feedbackElement.textContent = 'Por favor, preencha os campos Nome e Mensagem.';
                    feedbackElement.classList.add('show');
                    feedbackElement.style.backgroundColor = '#f8d7da';
                    feedbackElement.style.color = '#721c24';
                }
                return;
            }
            
            const whatsappNumber = '5562993465081';
            const whatsappMessage = `Olá! Vim pelo site da CPFM e gostaria de um orçamento.\n\n*Nome:* ${name}\n*E-mail:* ${document.getElementById('email').value}\n*Telefone:* ${document.getElementById('phone').value}\n\n*Mensagem:* ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            
            if(feedbackElement){
                feedbackElement.textContent = 'Obrigado! Abrindo o WhatsApp para você enviar a mensagem.';
                feedbackElement.classList.add('show');
                feedbackElement.style.backgroundColor = '#d4edda';
                feedbackElement.style.color = '#155724';
            }

            setTimeout(() => {
                this.reset();
                if(feedbackElement) feedbackElement.classList.remove('show');
            }, 4000);
        });
    }
    
    // 7. Garante que o scroll para âncoras de outra página funcione
    window.addEventListener('load', () => {
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => { targetElement.scrollIntoView(); }, 100);
            }
        }
    });

    // 8. Lógica para destacar o link ativo no menu ao rolar a página
    const sections = document.querySelectorAll('main > section[id]');
    if (sections.length > 0) {
        const navLinks = document.querySelectorAll('.nav a');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const visibleSectionId = entry.target.id;
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        link.classList.remove('active-link');
                        if (href.includes('#') && href.split('#')[1] === visibleSectionId) {
                            link.classList.add('active-link');
                        }
                    });
                }
            });
        }, { rootMargin: '-40% 0px -60% 0px' });
        sections.forEach(section => observer.observe(section));
    }

    // 9. Lógica para Botões de Compartilhamento do Blog
    document.querySelectorAll('.share-buttons').forEach(container => {
        const article = container.closest('.blog-post-full');
        if (article) {
            const postTitle = article.querySelector('.post-title').textContent;
            const postUrl = window.location.href.split('#')[0] + '#' + article.id;
            const whatsappBtn = container.querySelector('.share-whatsapp');
            if(whatsappBtn) whatsappBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + " - Leia mais em: " + postUrl)}`;
            const facebookBtn = container.querySelector('.share-facebook');
            if(facebookBtn) facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
            const linkedinBtn = container.querySelector('.share-linkedin');
            if(linkedinBtn) linkedinBtn.href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;
        }
    });

    // 10. Lógica para Animação de Rolagem
    const animatedElements = document.querySelectorAll('.fade-in-element');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(element => observer.observe(element));
    }
});