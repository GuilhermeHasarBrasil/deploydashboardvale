import { createContext, useContext, useEffect, useState } from "react";

let BPrint;
let ZPrint;

export const BrowserPrintContext = createContext();

export default function BrowserPrintProvider({ children }) {
  const [printer, setPrinter] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      BPrint = window?.BrowserPrint;
      
      BPrint?.getDefaultDevice("printer", (deviceDefault) => {
        setPrinter(deviceDefault);
      });
     // if (printer) ZPrint = new Zebra.Printer(printer);
    }
  }, [BPrint]);

  return <BrowserPrintContext.Provider value={{ printer, BPrint, ZPrint }}>{children}</BrowserPrintContext.Provider>;
}
export const useBroswerPrint = () => useContext(BrowserPrintContext);
