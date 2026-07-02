/* ==========================================================================
   1. CARROSSEL DE DESTAQUES (HOME)
   ========================================================================== */
const carrossel = document.querySelector('.carrossel');

if (carrossel) {
    const btnNext = document.querySelector('.next');
    const btnPrev = document.querySelector('.prev');

    if (btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            carrossel.scrollLeft += 300;
        });

        btnPrev.addEventListener('click', () => {
            carrossel.scrollLeft -= 300;
        });
    }
}


/* ==========================================================================
   2. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   ========================================================================== */
const formulario = document.getElementById("formContato");

if (formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();
        const msgErro = document.getElementById("mensagemErro");

        // Validação de campos vazios
        if (nome.length < 3) {
            msgErro.style.color = "red";
            msgErro.textContent = "O nome deve possuir pelo menos 3 letras.";
        return;
        }

        if (email === "") {
            msgErro.style.color = "red";
            msgErro.textContent = "Informe seu e-mail.";
            return;
        }

        if (!email.includes("@")) {
            msgErro.style.color = "red";
            msgErro.textContent = "E-mail inválido.";
            return;
        }

        if (mensagem.length < 10) {
            msgErro.style.color = "red";
            msgErro.textContent = "A mensagem deve ter pelo menos 10 caracteres.";
            return;
        }

        // Sucesso no envio
        msgErro.style.color = "green";
        msgErro.textContent = "Mensagem enviada com sucesso!";
        formulario.reset();
    });
}


/* ==========================================================================
   3. GERENCIAMENTO E EXIBIÇÃO DE ÁLBUNS DE FESTAS (PÁGINA FESTAS)
   ========================================================================== */
const gridAlbuns = document.getElementById("gridAlbuns");

if (gridAlbuns) {
    
    // Função auxiliar para gerar array de caminhos das imagens sequenciais
    function gerarAlbum(pasta, quantidade, prefixo) {
        const fotos = [];
        for (let i = 1; i <= quantidade; i++) {
            const numero = String(i).padStart(2, "0");
            fotos.push(`imagens/festas/${pasta}/${prefixo}${numero}.jpg`);
        }
        return fotos;
    }

    // Banco de dados dos álbuns
    const albuns = [
        {
            nome: "Pizza",
            capa: "imagens/festas/pizza/festa01img01.jpg",
            fotos: gerarAlbum("pizza", 14, "festa01img")
        },
        {
            nome: "Princesa Peach - Mario Bros",
            capa: "imagens/festas/peach/festa02img01.jpg",
            fotos: gerarAlbum("peach", 5, "festa02img")
        },
        {
            nome: "Power Rangers",
            capa: "imagens/festas/powerrangers/festa03img01.jpg",
            fotos: gerarAlbum("powerrangers", 7, "festa03img")
        },
        {
            nome: "Harry Potter",
            capa: "imagens/festas/harrypotter/festa04img01.jpg",
            fotos: gerarAlbum("harrypotter", 4, "festa04img")
        },
        {
            nome: "Frozen",
            capa: "imagens/festas/frozen/festa05img01.jpg",
            fotos: gerarAlbum("frozen", 6, "festa05img")
        },
        {
            nome: "Ghostbusters",
            capa: "imagens/festas/ghost/festa06img01.jpg",
            fotos: gerarAlbum("ghostbuster", 9, "festa06img")
        }
    ];

    // Elementos do Modal
    const modal = document.getElementById("modalAlbum");
    const fotoAtual = document.getElementById("fotoAtual");
    const fechar = document.querySelector(".fechar-modal");
    const btnPrevFoto = document.querySelector(".prev-foto");
    const btnNextFoto = document.querySelector(".next-foto");
    const contadorFoto = document.getElementById("contadorFoto");

    let albumAtivo = [];
    let indiceAtivo = 0;

    // Atualiza a imagem e os controles do Modal
    function atualizarModalUI() {
        fotoAtual.src = albumAtivo[indiceAtivo];
        contadorFoto.textContent = `Foto ${indiceAtivo + 1} / ${albumAtivo.length}`;

        btnPrevFoto.style.display = indiceAtivo === 0 ? "none" : "block";
        btnNextFoto.style.display = indiceAtivo === albumAtivo.length - 1 ? "none" : "block";
    }

    // Renderiza os cards na página de festas
    albuns.forEach(album => {
        const card = document.createElement("div");
        card.classList.add("album-card");
        card.innerHTML = `
            <img src="${album.capa}" alt="${album.nome}">
            <h3>${album.nome}</h3>
        `;

        card.addEventListener("click", () => {
            albumAtivo = album.fotos;
            indiceAtivo = 0;
            modal.style.display = "flex";
            atualizarModalUI();
        });

        gridAlbuns.appendChild(card);
    });

    // Eventos do Modal (Navegação)
    btnNextFoto.addEventListener("click", () => {
        if (indiceAtivo < albumAtivo.length - 1) {
            indiceAtivo++;
            atualizarModalUI();
        }
    });

    btnPrevFoto.addEventListener("click", () => {
        if (indiceAtivo > 0) {
            indiceAtivo--;
            atualizarModalUI();
        }
    });

    // Fechar Modal
    fechar.addEventListener("click", () => { modal.style.display = "none"; });
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}


/* ==========================================================================
   4. SISTEMA DE BUSCA INTERNA
   ========================================================================== */
const campoBusca = document.getElementById("campoBusca");
const btnBusca = document.getElementById("btnBusca");

if (campoBusca && btnBusca) {
    
    function executarPesquisa() {
        const texto = campoBusca.value.trim().toLowerCase();

        if (texto === "") {
            alert("Digite algo para pesquisar.");
            return;
        }

        // Palavras-chave para Festas
        if (
            texto.includes("festa") || texto.includes("pizza") ||
            texto.includes("harry") || texto.includes("frozen") ||
            texto.includes("ghost") || texto.includes("power") ||
            texto.includes("peach") || texto.includes("pokemon") ||
            texto.includes("mario") || texto.includes("buster") ||
            texto.includes("pizzaria") || texto.includes("elsa")
        ) {
            window.location.href = "festa.html";
            return;
        }

        // Palavras-chave para Tutoriais
        if (texto.includes("tutorial") || texto.includes("vídeo") || texto.includes("tutoriais")) {
            window.location.href = "tutorial.html";
            return;
        }

        // Palavras-chave para Contato
        if (texto.includes("contato") || texto.includes("email")) {
            window.location.href = "contato.html";
            return;
        }

        // Palavras-chave para Início
        if (texto.includes("inicio") || texto.includes("home")) {
            window.location.href = "index.html";
            return;
        }

        alert("Nenhum resultado encontrado.");
    }

    btnBusca.addEventListener("click", executarPesquisa);
    campoBusca.addEventListener("keypress", (e) => {
        if (e.key === "Enter") executarPesquisa();
    });
}


/* ==========================================================================
   5. BANNER ROTATIVO AUTOMÁTICO (HOME)
   ========================================================================== */
const banner = document.getElementById("bannerSlide");

if (banner) {
    const imagensBanner = [
        "./imagens/banners/banner06.jpeg",
        "./imagens/banners/banner07.jpeg",
        "./imagens/banners/banner12.jpeg",
        "./imagens/banners/banner10.jpeg",
        "./imagens/banners/banner01.jpeg",
        "./imagens/banners/banner06.jpeg",
        "./imagens/banners/banner05.jpeg"
    ];

    let indiceBanner = 0;

    setInterval(() => {
        indiceBanner++;
        if (indiceBanner >= imagensBanner.length) {
            indiceBanner = 0;
        }
        banner.src = imagensBanner[indiceBanner];
    }, 4000); // Troca a cada 4 segundos
}
