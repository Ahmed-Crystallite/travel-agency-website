"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField, inputStyles } from "@/components/ui/FormField";
import { services } from "@/data/services";
import { cn, wait } from "@/lib/utils";

type Status = "idle" | "submitting" | "success";
type FieldName = "name" | "email" | "message";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validators: Record<FieldName, (value: string) => string | null> = {
  name: (value) => (value.trim().length >= 2 ? null : "Please enter your full name."),
  email: (value) => (EMAIL_PATTERN.test(value) ? null : "Please enter a valid email address."),
  message: (value) => (value.trim().length >= 10 ? null : "Tell us a little more about your trip (10+ characters)."),
};

function validate(data: FormData) {
  return Object.fromEntries(
    Object.entries(validators)
      .map(([field, check]) => [field, check(String(data.get(field) ?? ""))])
      .filter(([, error]) => error),
  ) as Partial<Record<FieldName, string>>;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(new FormData(form));
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("submitting");
    await wait(1000);
    form.reset();
    setStatus("success");
  };

  const fieldProps = (name: FieldName) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-4xl bg-white p-10 text-center ring-1 ring-ink-900/5">
        <CircleCheck className="size-14 text-gold-500" strokeWidth={1.25} aria-hidden />
        <h3 className="mt-6 font-display text-3xl text-ink-900">Message received</h3>
        <p className="mt-3 max-w-sm text-ink-500">
          Thank you for reaching out. A travel specialist will get back to you within one business day.
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-4xl bg-white p-6 shadow-[0_30px_80px_-50px_rgba(11,28,46,0.45)] ring-1 ring-ink-900/5 sm:grid-cols-2 sm:p-10"
    >
      <FormField id="contact-name" label="Full name" error={errors.name}>
        <input {...fieldProps("name")} autoComplete="name" placeholder="Jane Doe" className={inputStyles} />
      </FormField>
      <FormField id="contact-email" label="Email address" error={errors.email}>
        <input {...fieldProps("email")} type="email" autoComplete="email" placeholder="jane@example.com" className={inputStyles} />
      </FormField>
      <FormField id="contact-phone" label="Phone" optional>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="+92 300 0000000" className={inputStyles} />
      </FormField>
      <FormField id="contact-service" label="I'm interested in">
        <select id="contact-service" name="service" defaultValue={services[0].id} className={cn(inputStyles, "cursor-pointer")}>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
          <option value="custom">A tailored package</option>
        </select>
      </FormField>
      <FormField id="contact-message" label="Your message" error={errors.message} className="sm:col-span-2">
        <textarea
          {...fieldProps("message")}
          rows={5}
          placeholder="Tell us where you would like to go, when, and who is travelling."
          className={cn(inputStyles, "resize-none")}
        />
      </FormField>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-500">We reply within one business day. No spam, ever.</p>
        <Button type="submit" variant="dark" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
