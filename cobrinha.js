window.onload = function(){
    var QuadradoPrincipal = document.getElementById('quadradoprincipal')
    var QuadradoConteudo = QuadradoPrincipal.getContext('2d')
    var pontos = document.getElementById('areapontos').value = 0
    var maxpontos = 0
    areapontos.innerHTML = `Pontos: ${pontos}   |   Pontos Máximos: ${maxpontos}`
    

    document.addEventListener('keydown', keyPush)

    setInterval(jogo, 60)

    var velocidade = 1 //Velocidade da cobrinha p/ pixel

    var VelocidadeX = 0 
    var VelocidadeY = 0 

    var PontoInicialX = 10 
    var PontoInicialY = 10

    var TamanhoPixel = 10
    var QuantidadePixel = 40

    var MacaX = 15
    var MacaY = 15

    var TamanhoCobrinha = []
    var TamanhoInicial = 5


    //Funçoes de pontos

    function AddPontos() {
        pontos += 10
        
        if (pontos > 200){
            pontos += 20
            
        } else if (pontos > 800){
            pontos += 30
        }  
        
        if (pontos > maxpontos) {
            maxpontos += 10
            if (maxpontos > 200) {
                maxpontos += 20
            } else if (maxpontos > 800) {
                maxpontos += 30
            }
        }        
        
    }

    function MostrarPontos () {
        
        areapontos.innerHTML = `Pontos: ${pontos}   |   Pontos Máximos: ${maxpontos}`
    }
    
    function reiniciar () {
        VelocidadeX = 0
        VelocidadeY = 0
        TamanhoInicial = 5
        PontoInicialX = 10 
        PontoInicialY = 10
        MacaX = 15
        MacaY = 15                 
        pontos = 0
        MostrarPontos()
    }
    /********************************/

    


    function jogo() {
        PontoInicialX += VelocidadeX
        PontoInicialY += VelocidadeY


        //Direções da cobrinha

        if (PontoInicialX < -1 || PontoInicialX > QuantidadePixel + 1 || PontoInicialY < - 1 || PontoInicialY > QuantidadePixel + 1){
            reiniciar()
        }

        // Edição do quadrado

        QuadradoConteudo.fillStyle = 'white'
        QuadradoConteudo.fillRect(0,0, QuadradoPrincipal.width, QuadradoPrincipal.height)
        
        QuadradoConteudo.fillStyle = 'red'
        QuadradoConteudo.fillRect(MacaX*TamanhoPixel, MacaY*TamanhoPixel, TamanhoPixel, TamanhoPixel)



        // Edição da cobrinha
        QuadradoConteudo.fillStyle = "black"
        for (var i = 0; i < TamanhoCobrinha.length; i++) {
            QuadradoConteudo.fillRect(TamanhoCobrinha[i].x*TamanhoPixel, TamanhoCobrinha[i].y*TamanhoPixel, TamanhoPixel, TamanhoPixel)
            if (TamanhoCobrinha[i].x == PontoInicialX && TamanhoCobrinha[i].y == PontoInicialY) {
                reiniciar()
                
            }
        }

        TamanhoCobrinha.push({x : PontoInicialX , y : PontoInicialY})
        while (TamanhoCobrinha.length > TamanhoInicial) {
            TamanhoCobrinha.shift()
        }

        

        // Ediçao da maça

        if (MacaX == PontoInicialX && MacaY == PontoInicialY) {
            TamanhoInicial += 5
            MacaX = Math.floor(Math.random()*QuantidadePixel)
            MacaY = Math.floor(Math.random()*QuantidadePixel)  
            
            AddPontos()

            MostrarPontos()
        }   
    }

    function keyPush(event) {
        switch(event.keyCode) {
            case 37: //esquerda
                VelocidadeX = -velocidade
                VelocidadeY = 0
                break
            case 38: //cima
                VelocidadeX = 0
                VelocidadeY = -velocidade
                break 
            case 39: //direita
                VelocidadeX = velocidade
                VelocidadeY = 0
                break
            case 40: //baixo
                VelocidadeX = 0
                VelocidadeY = velocidade
                break       
        }        
    }
}