import React, { FC } from "react";
import QRCode from "qrcode";
import "./QRCodeGenerator.css";

interface QRCodeGeneratorProps {
    content: string;
}

const QRCodeGenerator: FC<QRCodeGeneratorProps> = (props) => {
    const [qrContent, setQrContent] = React.useState<string>("");

    React.useEffect(() => {
        QRCode.toDataURL(props.content).then(setQrContent);
    }, []);

    return (
        <div className="QRCodeGenerator">
            <img src={qrContent} className={"qrcodegen-img"} />
        </div>
    );
};

export default QRCodeGenerator;
