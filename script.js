// Parallax suave no scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.servico-card, .depoimento-card');
    
    parallaxElements.forEach(element => {
        const speed = 0.05;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Smooth scroll nativo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação para FAQ com slide
document.querySelectorAll('.faq-item').forEach(item => {
    const pergunta = item.querySelector('h3');
    const resposta = item.querySelector('p');

    // Inicialmente esconde as respostas
    resposta.style.maxHeight = '0';
    resposta.style.overflow = 'hidden';
    resposta.style.transition = 'all 0.3s ease-out';
    
    pergunta.addEventListener('click', () => {
        const isOpen = resposta.style.maxHeight !== '0px';
        
        // Fecha todas as outras respostas
        document.querySelectorAll('.faq-item p').forEach(p => {
            p.style.maxHeight = '0';
            p.parentElement.classList.remove('ativo');
        });

        // Abre/fecha a resposta clicada
        if (!isOpen) {
            resposta.style.maxHeight = resposta.scrollHeight + 'px';
            item.classList.add('ativo');
        }
    });
});

const form = document.querySelector('#form-contato');

if (form) {
    const inputs = form.querySelectorAll('input, textarea');
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('invalid');
                input.classList.add('valid');
            } else {
                input.classList.remove('valid');
                input.classList.add('invalid');
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // impede o redirecionamento

        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        const formData = new FormData(form);

        try {
            await fetch('https://formsubmit.co/ajax/contato@jaquelinemoraes.com.br', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            submitButton.textContent = 'Mensagem Enviada!';
            submitButton.classList.add('success');
            form.reset();

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('success');
            }, 3000);

        } catch (error) {
            submitButton.textContent = 'Erro ao enviar!';
            submitButton.classList.add('error');

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('error');
            }, 3000);
        }
    });
}


// Animação de elementos quando aparecem na tela
const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
            
            // Adiciona efeito de contagem para números
            if (entry.target.classList.contains('numero')) {
                const numero = entry.target;
                const valor = parseInt(numero.dataset.valor);
                let atual = 0;
                
                const timer = setInterval(() => {
                    atual += 1;
                    numero.textContent = atual;
                    
                    if (atual >= valor) {
                        clearInterval(timer);
                    }
                }, 2000 / valor);
            }
        }
    });
}, {
    threshold: 0.2
});

// Elementos que receberão animações
document.querySelectorAll('.servico-card, .depoimento-card, .sobre-foto, .sobre-texto-container, .numero').forEach(elemento => {
    observador.observe(elemento);
});

// Efeito de hover 3D nos cards
document.querySelectorAll('.servico-card, .depoimento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}); 