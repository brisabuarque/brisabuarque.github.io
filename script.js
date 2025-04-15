function calcularFrete() {
    const cep = document.getElementById("cep").value.replace(/\D/g, "");
    const resultado = document.getElementById("resultado");

    if (cep.length !== 8) {
        resultado.textContent = "CEP inválido. Digite 8 números.";
        return;
    }

    resultado.textContent = "Calculando frete...";

    // Tabela baseada em simulação real no Melhor Envio
    const tabelaFrete = {
        "SP": { precoMin: 8.00, precoMax: 20.00, prazoMin: 1, prazoMax: 3, mediaPreco: 12, mediaPrazo: 2 },
        "RJ": { precoMin: 9.00, precoMax: 20.00, prazoMin: 3, prazoMax: 6, mediaPreco: 17, mediaPrazo: 5 },
        "MG": { precoMin: 10.00, precoMax: 20.00, prazoMin: 3, prazoMax: 5, mediaPreco: 17.5, mediaPrazo: 4 },
        "ES": { precoMin: 10.00, precoMax: 20.00, prazoMin: 3, prazoMax: 5, mediaPreco: 17.5, mediaPrazo: 4 },
        "PR": { precoMin: 11.00, precoMax: 22.00, prazoMin: 2, prazoMax: 5, mediaPreco: 17.5, mediaPrazo: 3 },
        "SC": { precoMin: 11.00, precoMax: 22.00, prazoMin: 3, prazoMax: 6, mediaPreco: 18.25, mediaPrazo: 3 },
        "RS": { precoMin: 14.00, precoMax: 22.00, prazoMin: 3, prazoMax: 8, mediaPreco: 19, mediaPrazo: 3 },
        "DF": { precoMin: 11.00, precoMax: 22.00, prazoMin: 3, prazoMax: 6, mediaPreco: 16.5, mediaPrazo: 3 },
        "GO": { precoMin: 11.00, precoMax: 22.00, prazoMin: 3, prazoMax: 6, mediaPreco: 18.5, mediaPrazo: 6 },
        "MT": { precoMin: 14.00, precoMax: 24.00, prazoMin: 2, prazoMax: 7, mediaPreco: 18.5, mediaPrazo: 6 },
        "MS": { precoMin: 13.00, precoMax: 22.00, prazoMin: 2, prazoMax: 6, mediaPreco: 18.5, mediaPrazo: 6 },
        "BA": { precoMin: 12.00, precoMax: 24.00, prazoMin: 2, prazoMax: 6, mediaPreco: 19, mediaPrazo: 5 },
        "SE": { precoMin: 12.00, precoMax: 26.00, prazoMin: 4, prazoMax: 7, mediaPreco: 19, mediaPrazo: 6 },
        "AL": { precoMin: 12.00, precoMax: 26.00, prazoMin: 2, prazoMax: 7, mediaPreco: 20, mediaPrazo: 6 },
        "PE": { precoMin: 12.00, precoMax: 28.00, prazoMin: 2, prazoMax: 7, mediaPreco: 21.5, mediaPrazo: 7 },
        "PB": { precoMin: 12.00, precoMax: 32.00, prazoMin: 4, prazoMax: 10, mediaPreco: 22, mediaPrazo: 7 },
        "RN": { precoMin: 13.00, precoMax: 25.00, prazoMin: 2, prazoMax: 8, mediaPreco: 22.5, mediaPrazo: 8 },
        "CE": { precoMin: 14.00, precoMax: 27.00, prazoMin: 2, prazoMax: 8, mediaPreco: 22.75, mediaPrazo: 8 },
        "PI": { precoMin: 14.00, precoMax: 30.00, prazoMin: 4, prazoMax: 10, mediaPreco: 24, mediaPrazo: 9 },
        "MA": { precoMin: 17.00, precoMax: 30.00, prazoMin: 6, prazoMax: 12, mediaPreco: 24, mediaPrazo: 9 },
        "TO": { precoMin: 15.00, precoMax: 28.00, prazoMin: 5, prazoMax: 10, mediaPreco: 24, mediaPrazo: 7 },
        "PA": { precoMin: 17.00, precoMax: 30.00, prazoMin: 5, prazoMax: 10, mediaPreco: 24.5, mediaPrazo: 8 },
        "AP": { precoMin: 22.00, precoMax: 32.00, prazoMin: 6, prazoMax: 13, mediaPreco: 30, mediaPrazo: 12 },
        "RR": { precoMin: 22.00, precoMax: 32.00, prazoMin: 6, prazoMax: 16, mediaPreco: 32.5, mediaPrazo: 15 },
        "AM": { precoMin: 23.00, precoMax: 35.00, prazoMin: 6, prazoMax: 15, mediaPreco: 32.5, mediaPrazo: 13 },
        "AC": { precoMin: 17.00, precoMax: 33.00, prazoMin: 5, prazoMax: 13, mediaPreco: 29.5, mediaPrazo: 12 },
        "RO": { precoMin: 17.00, precoMax: 35.00, prazoMin: 5, prazoMax: 12, mediaPreco: 32.5, mediaPrazo: 9 }
    };

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultado.textContent = "CEP não encontrado.";
                return;
            }

            const uf = data.uf;
            const frete = tabelaFrete[uf] || tabelaFrete["OUTROS"];

            resultado.innerHTML = `
  <h3 style="color: #ffc1e3; font-family: 'Quicksand', sans-serif; font-weight: 600;">Frete estimado:</h3>
  <table class="fade-slide" style="border-collapse: collapse; margin-top: 10px; width: 100%; max-width: 500px; background-color: #ffffff10; color: #fff; font-family: 'Quicksand', sans-serif;">
      <tr style="background-color: #ffffff1a;">
          <th style="border: 1px solid #ffffff30; padding: 8px;">Estado</th>
          <th style="border: 1px solid #ffffff30; padding: 8px;">Preço</th>
          <th style="border: 1px solid #ffffff30; padding: 8px;">Prazo</th>
      </tr>
      <tr>
          <td style="border: 1px solid #ffffff30; padding: 8px;">${uf}</td>
          <td style="border: 1px solid #ffffff30; padding: 8px;">
              R$ ${frete.precoMin.toFixed(2)} a R$ ${frete.precoMax.toFixed(2)}<br>
              <em style="font-size: 0.9rem; color: #ffc1e3;">Média: R$ ${frete.mediaPreco.toFixed(2)}</em>
          </td>
          <td style="border: 1px solid #ffffff30; padding: 8px;">
              ${frete.prazoMin} a ${frete.prazoMax} dias úteis<br>
              <em style="font-size: 0.9rem; color: #ffc1e3;">Média: ${frete.mediaPrazo} dias</em>
          </td>
      </tr>
  </table>
`;

            resultado.classList.add("show");

        })
        .catch(() => {
            resultado.textContent = "Erro ao consultar o CEP.";
        });
}
