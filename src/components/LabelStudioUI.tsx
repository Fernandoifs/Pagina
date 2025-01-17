import React, { useEffect } from 'react';
import LabelStudio from 'label-studio';

interface LabelStudioUIProps {
  containerId: string;
  imageUrl: string;
}

const LabelStudioUI: React.FC<LabelStudioUIProps> = ({ containerId, imageUrl }) => {
  useEffect(() => {
    // Inicializando o LabelStudio
    const options = {
      containerId,
      config: `
        <View display='inline'>
          <RectangleLabels canRotate='false' name='tag' toName='img'>
            <Label value='figura'/>
            <Label value='alternativa'/>
            <Label value='enunciado'/>
            <Label value='questao'/>
            <Label value='gabarito' background="red"/>
            <Label value='resolucao' background='green'/>
          </RectangleLabels>
          <Image name='img' value='$image' zoomBy='1.5'/>
        </View>
      `,
      interfaces: [
        'panel',
        'update',
        'controls',
        'side-column',
        'submit',
        'review',
      ],
      task: {
        annotations: [],
        predictions: [],
        data: {
          image: imageUrl,
        },
      },
    };

    // Garantir que o containerId seja válido
    if (!containerId) {
      console.error("containerId is required");
      return;
    }

    // Criar a instância do LabelStudio
    const labelStudioInstance = new LabelStudio(containerId, options);

    // Limpeza, quando o componente for desmontado
    return () => {
      // Se houver um método destroy ou equivalente no LabelStudio, podemos usá-lo aqui
      // Se o LabelStudio não tiver um método explícito para limpar, então talvez seja desnecessário
      // labelStudioInstance.destroy(); // se existir, destrua a instância
      console.log("LabelStudio instance cleaned up");
    };
  }, [containerId, imageUrl]);

  return null; // LabelStudioUI não precisa renderizar nada diretamente
};

export default LabelStudioUI;
