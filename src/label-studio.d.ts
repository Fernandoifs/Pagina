declare module 'label-studio' {
    interface LabelStudioOptions {
      containerId: string;
      config: string;
      interfaces: string[];
      task: any;
      onLabelStudioLoad?: (LS: any) => void;
      onSubmitAnnotation?: (LS: any, annotation: any) => void;
      onUpdateAnnotation?: (LS: any, annotation: any) => void;
    }
  
    class LabelStudio {
      constructor(containerId: string, options: LabelStudioOptions);
      annotationStore: {
        annotations: {
          toJSON(): any[];
        };
        addAnnotation(options: any): { id: string };
        selectAnnotation(id: string): void;
      };
    }
  
    export default LabelStudio;
  }
  