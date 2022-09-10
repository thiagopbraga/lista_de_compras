const api = "api.json"

const $root = document.getElementById("root")

const getApi = async () => {
    const response = await fetch(api)
    const data = await response.json()
    for ( let i = 0; i < data.teste.length; i++){
        $root.innerHTML = data.teste[i].chave
    }
    return data
    }
getApi()