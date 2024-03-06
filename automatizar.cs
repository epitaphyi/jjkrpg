using System;

class Program
{
    static void Main()
    {
        // Solicitar ao usuário que insira todo o texto do talento
        Console.WriteLine("Digite o texto do talento (nome, descrição e requisitos):");
        string textoTalento = Console.ReadLine();

        // Extrair as informações do texto do talento
        string[] talentoInfo = textoTalento.Split("\n", StringSplitOptions.RemoveEmptyEntries);

        string nome = talentoInfo[0]; // A primeira linha é o nome do talento
        string descricao = talentoInfo[1]; // A segunda linha é a descrição do talento

        // Extrair o requisito de nível do talento
        int requisitoNivel = 0;
        foreach (string linha in talentoInfo)
        {
            if (linha.Contains("Pré-Requisito: Nível"))
            {
                string[] partes = linha.Split(": ");
                requisitoNivel = int.Parse(partes[1]);
                break;
            }
        }

        // Criar o objeto JavaScript com base nas informações fornecidas
        string objetoJavaScript = CriarObjetoJavaScript(nome, descricao, requisitoNivel);

        // Exibir o objeto JavaScript
        Console.WriteLine("\nObjeto JavaScript criado:");
        Console.WriteLine(objetoJavaScript);
    }

    static string CriarObjetoJavaScript(string nome, string descricao, int requisitoNivel)
    {
        // Construir o objeto JavaScript com os campos fornecidos
        string objetoJavaScript = "{\n";
        objetoJavaScript += $"  nome: '{nome}',\n";
        objetoJavaScript += $"  descricao: '{descricao}',\n";
        objetoJavaScript += $"  requisito_nivel: {requisitoNivel},\n";
        objetoJavaScript += "  requisito_atributo: 0,\n";
        objetoJavaScript += "  requisito_maestria: '',\n";
        objetoJavaScript += "  requisito_habilidade: false\n";
        objetoJavaScript += "}";

        return objetoJavaScript;
    }
}