import { create } from "zustand";
import {
  FormOneData,
  FormTwoData,
  FormThreeData,
  FormData,
} from "@/schemas/form.schema";
import { SOURCES_ENUM } from "@/schemas/common.schema";
import { DefaultValues } from "react-hook-form";
import { merge } from "lodash";
import {
  formOneDefaultValues,
  formThreeDefaultValues,
  formTwoDefaultValues,
} from "@/constants/formDefaultValues";

export type KycApplicationStore = {
  source: SOURCES_ENUM;
  setSource: (source: SOURCES_ENUM) => void;
  step: number;
  setStep: (step: number) => void;
  formOneDefaultValues: DefaultValues<FormOneData> | null;
  setFormOneDefaultValues: (values?: DefaultValues<FormOneData>) => void;
  formTwoDefaultValues: DefaultValues<FormTwoData> | null;
  setFormTwoDefaultValues: (values?: DefaultValues<FormTwoData>) => void;
  formThreeDefaultValues: DefaultValues<FormThreeData> | null;
  setFormThreeDefaultValues: (values?: DefaultValues<FormThreeData>) => void;
  formData: Partial<FormData> | null;
  setFormData: (data: FormOneData | FormTwoData | FormThreeData) => void;
};

export const useFormStore = create<KycApplicationStore>((set, get) => {
  return {
    source: SOURCES_ENUM.MANUAL,
    setSource: (source) => set({ source }),
    step: 1,
    setStep: (step: number) => set({ step }),
    formOneDefaultValues: null,
    setFormOneDefaultValues: (values) => {
      const defaultValues = formOneDefaultValues;
      set({ formOneDefaultValues: merge(defaultValues, values) });
    },
    formTwoDefaultValues: null,
    setFormTwoDefaultValues: (values) => {
      const defaultValues = formTwoDefaultValues;
      set({ formTwoDefaultValues: merge(defaultValues, values) });
    },
    formThreeDefaultValues: null,
    setFormThreeDefaultValues: (values) => {
      const defaultValues = formThreeDefaultValues;
      set({ formThreeDefaultValues: merge(defaultValues, values) });
    },
    formData: null,
    setFormData: (data) => {
      const { formData } = get();
      set({
        formData: merge(formData, data),
      });
    },
  };
});
