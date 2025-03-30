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
import * as formDefaultValues from "@/constants/formDefaultValues";

export type KycApplicationStore = {
  source: SOURCES_ENUM;
  setSource: (source: SOURCES_ENUM) => void;
  step: number;
  setStep: (step: number) => void;
  formOneDefaultValues: DefaultValues<FormOneData> | null;
  formTwoDefaultValues: DefaultValues<FormTwoData> | null;
  formThreeDefaultValues: DefaultValues<FormThreeData> | null;
  setFormDefaultValues: (
    data?: DefaultValues<FormOneData> &
      DefaultValues<FormTwoData> &
      DefaultValues<FormThreeData>,
  ) => void;
  formData: Partial<FormData> | null;
  setFormData: (data: FormOneData | FormTwoData | FormThreeData) => void;
  getFormData: () => Partial<FormData> | null;
  isSingpassForm: () => boolean;
  isSubmittingApplication: boolean;
  setIsSubmittingApplication: (bool: boolean) => void;
  resetForm: () => void;
};

export const useFormStore = create<KycApplicationStore>((set, get) => {
  const _setFormDefaultValues = (
    data?: DefaultValues<FormOneData> &
      DefaultValues<FormTwoData> &
      DefaultValues<FormThreeData>,
  ) => {
    set({
      formOneDefaultValues: merge(formDefaultValues.formOneDefaultValues, data),
      formTwoDefaultValues: merge(formDefaultValues.formTwoDefaultValues, data),
      formThreeDefaultValues: merge(
        formDefaultValues.formThreeDefaultValues,
        data,
      ),
    });
  };

  return {
    source: SOURCES_ENUM.MANUAL,
    setSource: (source) => set({ source }),
    step: 1,
    setStep: (step: number) => set({ step }),
    formOneDefaultValues: null,
    formTwoDefaultValues: null,
    formThreeDefaultValues: null,
    setFormDefaultValues(data) {
      _setFormDefaultValues(data);
    },
    formData: null,
    setFormData: (data) => {
      const { formData } = get();
      set({
        formData: merge(formData, data),
      });
    },
    getFormData: () => {
      const { formData } = get();
      return formData;
    },
    isSingpassForm: () => {
      const { source } = get();
      return source === SOURCES_ENUM.SINGPASS;
    },
    isSubmittingApplication: false,
    setIsSubmittingApplication: (bool: boolean) => {
      set({
        isSubmittingApplication: bool,
      });
    },
    resetForm: () => {
      set({
        step: 1,
      });
      _setFormDefaultValues({});
    },
  };
});
