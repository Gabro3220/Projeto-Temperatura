const obj_body = document.querySelector('body')

const obj_form_extrato = document.querySelector('#form_extrato')
const obj_form_importar = document.querySelector('#form_importar')
const obj_input_sel_arq = document.querySelector('#input_sel_arq')
const obj_input_data_ini = document.querySelector('#input_data_ini')
const obj_input_data_fim = document.querySelector('#input_data_fim')
const obj_imp = document.querySelector('#imp')
const obj_ext = document.querySelector('#ext')
const obj_bt_extrato = document.querySelector('#bt_extrato')
const obj_res_imp = document.querySelector('#res_imp')
const obj_tab_geral = document.querySelector('#tab_geral')

let dados_arq = []
let data_ini = new Date('9999/12/31')
let data_fim = new Date('0001/01/01')
const conteudo_arq = new FileReader()

obj_body.addEventListener('load', funLimparFormularios())
obj_input_sel_arq.addEventListener('change', funLerArquivoLocal)
conteudo_arq.addEventListener('load', funCarregarArquivoLocal)
obj_bt_extrato.addEventListener('click', calcularMedia)


function funLimparFormularios() {
    obj_form_importar.reset()
    obj_form_extrato.reset()
}

function funLerArquivoLocal() {
    const arq = document.querySelector('#input_sel_arq').files[0]
    conteudo_arq.readAsText(arq)
}

function funLimparTabela(par_tab) {
    let linhas = par_tab.rows
    for (var i = linhas.length; i > 0; i--) {
        par_tab.removeChild(par_tab.firstElementChild)
    }    
}

function funCabecalhoTabelaImp() {
    obj_tab_geral.setAttribute('class', 'bordas_tabela')
    const obj_tr = document.createElement('tr')
    const obj_col1 = document.createElement('th')
    const obj_col2 = document.createElement('th')
    const obj_col3 = document.createElement('th')
    obj_col1.innerHTML = 'Data'
    obj_col2.innerHTML = 'Temperatura'
    obj_col3.innerHTML = 'Umidade'
    obj_tr.appendChild(obj_col1)
    obj_tr.appendChild(obj_col2)
    obj_tr.appendChild(obj_col3)

    obj_tab_geral.appendChild(obj_tr)
}

function funCorpoTabelaImp() {
    for (var i = 0; i < dados_arq.length; i++) {
        const obj_tr = document.createElement('tr')
        const obj_col1 = document.createElement('td')
        const obj_col2 = document.createElement('td')
        const obj_col3 = document.createElement('td')
        obj_col1.innerHTML = dados_arq[i]['Data']
        obj_col2.innerHTML = dados_arq[i]['Temperatura']
        obj_col3.innerHTML = dados_arq[i]['Umidade']
        obj_tr.appendChild(obj_col1)
        obj_tr.appendChild(obj_col2)
        obj_tr.appendChild(obj_col3)

        obj_tab_geral.appendChild(obj_tr)
    }
}

function funLimparDadosSaldoExtrato() {
    contas = []
    data_ini = new Date('9999/12/31')
    data_fim = new Date('0001/01/01')

    for (var i = ( obj_sel_conta_saldo.options.length -1 ); i > 0; i-- ) {
        obj_sel_conta_saldo.options[i].remove()
    }

    for (var i = ( obj_sel_conta_extrato.options.length -1 ); i > 0; i-- ) {
        obj_sel_conta_extrato.options[i].remove()
    }

    obj_input_saldo.setAttribute('value', '')
    obj_input_saldo.setAttribute('class', '')

    obj_form_saldo.reset()
    obj_form_extrato.reset()
}

function funCarregarArquivoLocal() {
    dados_arq = []
    let linhas_separadas = conteudo_arq.result.split('\r\n')
    for (var i = 0; i < linhas_separadas.length; i++) {
        let colunas_separadas = linhas_separadas[i].split(';')
        dados_arq[i] = {
            // YYYY/MM/DD
            Data: colunas_separadas[0].substring(0, 2) + '/' +
                           colunas_separadas[0].substring(2, 4) + '/' +
                           colunas_separadas[0].substring(4, 8) ,
            Temperatura: colunas_separadas[1] + '°C',
            Umidade: colunas_separadas[2] + '%'
        }
    }
    funLimparTabela(obj_tab_geral)
    funCabecalhoTabelaImp()
    funCorpoTabelaImp()
    funLimparDadosSaldoExtrato()
}
