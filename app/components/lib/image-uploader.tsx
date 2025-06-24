"use client";

import React, {
  useEffect,
  useState,
  useImperativeHandle,
  Ref,
  forwardRef,
  useRef,
} from "react";
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Input } from "./input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { ImagePlus, CircleXIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "./slider";
import Cropper, { Point, Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Label } from "./label";
import { Button } from "./button";
import { getCroppedImg } from "@/lib/crop-image";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";

export interface ImageUploaderComponentRef {
  onClick: VoidFunction;
  removeImage: VoidFunction;
}

interface ImageUploaderProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  imageRef: FieldPath<T>;
  title: string;
  allowRemoveImage?: boolean;
  defaultImage?: string;
  className?: string;
  imgClassName?: string;
  imgCropShape?: "rect" | "round";
  placeholder?: React.ReactNode;
}

const ImageUploaderContent = <T extends FieldValues>(
  {
    form,
    imageRef,
    title,
    defaultImage,
    className,
    allowRemoveImage = true,
    imgClassName,
    imgCropShape = "rect",
    placeholder,
  }: ImageUploaderProps<T>,
  ref: Ref<ImageUploaderComponentRef>,
) => {
  const refInput = useRef<HTMLInputElement>(null);
  const [tempImage, setTempImage] = useState<string | ArrayBuffer | null>("");
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    defaultImage || "",
  );

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const [showEditorDialog, setShowEditorDialog] = useState(false);

  useImperativeHandle(ref, () => ({ onClick, removeImage }));

  useEffect(() => {
    if (!showEditorDialog) {
      resetEditorConfig();
    }
  }, [showEditorDialog]);

  const resetEditorConfig = () => {
    setTempImage(null);
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(undefined);
  };

  const onCropComplete = async (
    _croppedArea: Area,
    croppedAreaPixels: Area,
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const saveChanges = async () => {
    if (!croppedAreaPixels) {
      return;
    }

    try {
      const { image, imageUrl } = await getCroppedImg(
        tempImage as string,
        croppedAreaPixels,
        rotation,
      );
      setImage(imageUrl);
      form.setValue(imageRef, image as PathValue<T, Path<T>>);
      form.clearErrors(imageRef);
    } catch (e) {
      console.error(e);
      toast.error("Image crop failed. Please try again.");
      form.resetField(imageRef);
    }
  };

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    try {
      reader.onload = () => setTempImage(reader.result);
      reader.readAsDataURL(acceptedFiles[0]);
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed. Please try again.");
      setTempImage(null);
    }
  }, []);

  const removeImage = () => {
    resetEditorConfig();
    setImage(null);
    form.resetField(imageRef);
  };

  const {
    inputRef,
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const onClick = () => {
    inputRef?.current.click();
  };

  return (
    <>
      <FormField
        control={form.control}
        name={imageRef}
        render={() => (
          <FormItem>
            <FormLabel
              className={`${fileRejections.length !== 0 && "text-destructive"}`}
            >
              {title}
            </FormLabel>
            <FormControl>
              <div className="relative flex w-fit items-center justify-start">
                {image && allowRemoveImage && (
                  <CircleXIcon
                    className="absolute right-0 top-0 cursor-pointer"
                    onClick={removeImage}
                  />
                )}

                <div
                  {...getRootProps()}
                  className={cn(
                    "relative flex aspect-square max-h-[250px] min-h-[150px] cursor-pointer flex-col items-center justify-center gap-y-2 overflow-hidden rounded-lg border border-foreground/50",
                    className,
                  )}
                >
                  {image && (
                    <img
                      src={image as string}
                      alt="Uploaded image"
                      className={cn("object-cover", imgClassName)}
                    />
                  )}
                  <div className="flex scale-75 flex-col items-center gap-y-3">
                    {placeholder ? (
                      placeholder
                    ) : (
                      <ImagePlus
                        className={`size-28 opacity-80 ${image ? "hidden" : "block"}`}
                      />
                    )}
                    <Input
                      {...getInputProps()}
                      // ref={refInput}
                      type="file"
                      onInput={() => setShowEditorDialog(true)}
                    />
                    {!image && (
                      <p className="text-center">
                        {isDragActive
                          ? "Drop the image!"
                          : "Click here or drag an image to upload it"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </FormControl>
            <FormMessage>
              {fileRejections.length !== 0 && (
                <p>Image must be less than 1MB and of type png, jpg, or jpeg</p>
              )}
            </FormMessage>
          </FormItem>
        )}
      />
      <Dialog open={showEditorDialog} onOpenChange={setShowEditorDialog}>
        <DialogContent className="min-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          <div className="relative h-auto max-h-[80vh] min-h-[60vh] py-4">
            <Cropper
              image={tempImage as string}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1}
              cropShape={imgCropShape}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div>
            <Label>Zoom</Label>
            <Slider
              className="mt-2"
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onValueChange={(zoom) => setZoom(zoom[0])}
            />
          </div>
          <div>
            <Label>Rotation</Label>
            <Slider
              className="mt-2"
              value={[rotation]}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onValueChange={(rotation) => setRotation(rotation[0])}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={saveChanges}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const ImageUploader = forwardRef(ImageUploaderContent) as <
  T extends FieldValues,
>(
  props: ImageUploaderProps<T> & { ref?: Ref<ImageUploaderComponentRef> },
) => ReturnType<typeof ImageUploaderContent>;
