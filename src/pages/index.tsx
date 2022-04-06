import Cliente from "../../core/Cliente";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import { useEffect, useState } from "react";
import ClienteRepositorio from "../../core/ClienteRepositorio";
import ColecaoCliente from "../backend/db/ColecaoCliente";

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  
  useEffect(() => {
    repo.obterTodos().then(setClientes)
  }, [])

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisivel('form')
  }

  function clienteExcluido(cliente: Cliente) {
    console.log(`Cliente ${cliente.nome} excluido`)
  }

  function novoCliente() {
    setCliente(Cliente.vazio())
    setVisivel('form')
  }
  
  function salvarCliente(cliente: Cliente) {
    console.log(`Cliente ${cliente.nome} salvo`)
    setVisivel('tabela');
  }

  return (
    <div className={`
    flex justify-center items-center h-screen
    bg-gradient-to-r from-blue-900 to-purple-900
    text-white 
    `}>
      <Layout titulo="Cadastro Simples">
        {visivel === 'tabela' ? (

          <>
            <div className="flex justify-end">
              <Botao cor="green" className="mb-4" 
                onClick={novoCliente}>
                Novo Cliente
              </Botao>
            </div>
                <Tabela clientes={clientes} 
                    clienteSelecionado={clienteSelecionado}
                    clienteExcluido={clienteExcluido}
                />
          </>
        ) : (
            <Formulario 
              cliente={cliente}
              clienteMudou={salvarCliente}
              cancelado={() => setVisivel('tabela')}  
            />
        )}
      </Layout>
    </div>
  )
}