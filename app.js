document.addEventListener('DOMContentLoaded', () => {
    const inputTexto = document.getElementById('inputTexto');
    const resultadoTexto = document.querySelector('.container-resultado textarea');
    const btnEncriptar = document.getElementById('btnEncriptar');
    const btnDesencriptar = document.getElementById('btnDesencriptar');
    const btnCopiar = document.getElementById('btnCopiar');
    const advertencia = document.getElementById('advertencia');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const charCount = document.getElementById('charCount');
    const maxLength = inputTexto.getAttribute('maxlength');

    function validarTexto() {
        const texto = inputTexto.value;
        const contieneMayusculas = /[A-Z]/.test(texto);
        const contieneNumeros = /\d/.test(texto);
        const contieneCaracteresEspeciales = /[^a-z\s]/.test(texto);

        if (contieneMayusculas || contieneNumeros || contieneCaracteresEspeciales) {
            advertencia.classList.remove('hidden');
            btnEncriptar.disabled = true;
            btnDesencriptar.disabled = true;
            btnEncriptar.classList.add('disabled');
            btnDesencriptar.classList.add('disabled');
        } else {
            advertencia.classList.add('hidden');
            btnEncriptar.disabled = false;
            btnDesencriptar.disabled = false;
            btnEncriptar.classList.remove('disabled');
            btnDesencriptar.classList.remove('disabled');
        }
    }

    function updateCharCount() {
        const currentLength = inputTexto.value.length;
        charCount.textContent = `${currentLength}/${maxLength}`;
    }

    inputTexto.addEventListener('input', () => {
        validarTexto();
        updateCharCount();
    });

    modal.classList.remove('hidden');

    modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });

    validarTexto();
    updateCharCount();

    btnEncriptar.addEventListener("click", () => {
        const texto = inputTexto.value;
        resultadoTexto.value = encriptar(texto);
        inputTexto.value = "";  
        updateCharCount();  
    });

    btnDesencriptar.addEventListener("click", () => {
        const texto = inputTexto.value;
        resultadoTexto.value = desencriptar(texto);
        inputTexto.value = "";
    });

    btnCopiar.addEventListener("click", () => {
        resultadoTexto.select();
        document.execCommand("copy");
    });

    function encriptar(texto) {
        return texto.replace(/e/g, "enter")
                    .replace(/i/g, "imes")
                    .replace(/a/g, "ai")
                    .replace(/o/g, "ober")
                    .replace(/u/g, "ufat");
    }

    function desencriptar(texto) {
        return texto.replace(/enter/g, "e")
                    .replace(/imes/g, "i")
                    .replace(/ai/g, "a")
                    .replace(/ober/g, "o")
                    .replace(/ufat/g, "u");
    }
});
