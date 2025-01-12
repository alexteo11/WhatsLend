import { cn } from "@/lib/utils";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../lib/accordion";

interface FAQProps extends React.HTMLAttributes<HTMLDivElement> {
  list: Array<{
    title: string;
    content: string;
  }>;
}

const FAQ = ({ list, className }: FAQProps) => {
  return (
    <div className={cn("", className)}>
      <Accordion type="multiple" className="mt-4">
        {list.map((item, index) => {
          return (
            <div key={index} className="flex flex-col">
              <AccordionItem
                className="[&>*>*]:text-base"
                value={`item-${index}`}
              >
                <AccordionTrigger className="py-0 font-semibold [&>svg]:scale-150 [&>svg]:text-app">
                  <div className="my-1.5 flex h-[46px] items-center justify-start">
                    <div className="mr-5 h-full w-1.5 bg-app" />
                    <span className="!my-[80px]">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-2 ml-1.5 px-4 text-start text-sm text-light-gray">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FAQ;
