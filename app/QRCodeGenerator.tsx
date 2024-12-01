import { useState, useEffect } from "react";
import QRCode, { QRCodeToDataURLOptions } from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [enableAnalytics, setEnableAnalytics] = useState(false);
  const [qrCodeDataURL, setQRCodeDataURL] = useState("");

  useEffect(() => {
    if (url) {
      generateQRCode(url);
    }
  }, [url]);

  const generateQRCode = async (data: string) => {
    try {
      const options: QRCodeToDataURLOptions = {
        width: 400,
        margin: 1,
        type: "image/png",
        maskPattern: 6,
        errorCorrectionLevel: "H",
      };
      const dataURL = await QRCode.toDataURL(data, options);
      setQRCodeDataURL(dataURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="url">Enter URL for QR Code</Label>
        <Input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="enableAnalytics"
          checked={enableAnalytics}
          onCheckedChange={(checked) => setEnableAnalytics(checked as boolean)}
        />
        <Label htmlFor="enableAnalytics">Enable Analytics</Label>
      </div>

      {qrCodeDataURL && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Image
              src={qrCodeDataURL}
              alt="Generated QR Code"
              width={400}
              height={400}
            />
          </div>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <a href={qrCodeDataURL} download="qrcode.png">
                Download QR Code
              </a>
            </Button>
            <Input value={url} readOnly />
          </div>
        </div>
      )}

      {/* <Button type="submit" className="w-full">Generate QR Code</Button> */}
    </form>
  );
}
