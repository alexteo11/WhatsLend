"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/lib/form";
import { Input } from "@/app/components/lib/input";
import { Textarea } from "@/app/components/lib/textarea";
import { Button } from "@/app/components/lib/button";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "@/lib/axios";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await axios.post("/contact", data);
      toast.success("Thank you! Your message has been sent.");
      form.reset();
    } catch (error: unknown) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="middle-container-width py-10 md:py-16">
      {/* Page Title */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
          We’re here to help! Send us a message and our team will get back to
          you soon.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Contact Form */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Send a Message
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your full name"
                        {...field}
                        className="application__form-input h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                        className="application__form-input h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message here..."
                        rows={6}
                        {...field}
                        className="application__form-input resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="h-12 w-full text-base"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Contact Information
            </h2>

            <div className="space-y-5">
              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <Phone className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <a
                    href="tel:+6512345678"
                    className="text-gray-600 transition hover:text-indigo-600"
                  >
                    +65 1234 5678
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a
                    href="mailto:contact@compareloan.com"
                    className="text-gray-600 transition hover:text-indigo-600"
                  >
                    contact@compareloan.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    38 Jln Pemimpin <br />
                    Singapore 577178
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Find Us
            </h2>

            <div className="overflow-hidden rounded-xl border">
              <iframe
                src={`https://www.google.com/maps?q=38+Jln+Pemimpin,+Singapore+577178&output=embed`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
