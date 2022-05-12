import { useCallback, useRef, useState } from 'react'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface IProps {
    setImage: (file: Blob) => void;
    imagePreview: string;
}

const PhotoWidgetCropper: React.FC<IProps> = ({ setImage, imagePreview }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const cropper = useRef<Cropper>(null);

    const cropImage = () => {
        if(cropper.current && typeof cropper.current.getCroppedCanvas() === 'undefined') {
            return;
        }
        cropper && cropper.current && cropper.current.getCroppedCanvas().toBlob((blob: any) => 
        {
            setImage(blob);
        }, 'image/jpeg');
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
  }, [])
    return(
        <Cropper
            ref={cropper}
            style={{ height: 270, width: 678 }}
            src={imagePreview}
            aspectRatio={1 / 1}
            guides={false}
            viewMode={1}
            preview='.img-preview'
            dragMode='move'
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            crop={cropImage}
        />
    );
}

export default PhotoWidgetCropper;