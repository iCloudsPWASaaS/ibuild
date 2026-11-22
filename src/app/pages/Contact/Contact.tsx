import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button, Input, Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Header, Footer, CTASection, SectionHeader } from "../../../components/index";
import { useGeneraldata } from "../../../hooks/useGeneral";
import { useContactus } from "../../../hooks/useContactus";
import { toast } from "react-toastify";
import Seo from "../../../components/seo/Seo";
import { CONTACT_US_ROUTE } from "../../../helper/routes";
type ErrorsType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};
type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};
type FormFields = keyof FormDataType;

export function ContactPage() {
  const { mutate, isPending } = useContactus();
  const { data, isLoading } = useGeneraldata();

  const [formdata, setFormdata] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<ErrorsType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  
  const handlechange = (e:any) => {
    setFormdata((pre) => ({ ...pre, [e.target.id]: e.target.value }));
        const field = e?.target?.id as FormFields;
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\-\s()]*$/;

    if (!formdata.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (!formdata.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!formdata.email.trim()) {
      newErrors.email = "Email Address is required";
      isValid = false;
    } else if (!emailRegex.test(formdata.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (formdata.phone && !phoneRegex.test(formdata.phone)) {
      newErrors.phone = "Invalid phone format";
      isValid = false;
    }

    if (!formdata.subject) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formdata.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (validateForm()) {
      mutate(formdata, {
        onSuccess: (data) => {
          if (data?.success) {
            toast.success(data?.message || "Your message has been sent successfully!");
          } else {
            toast.error(data?.message || "Failed to send your message. Please try again later.");
          }
        },
        onError: () => {
          toast.error(data?.message || "Failed to send your message. Please try again later.");
        }
      });
      setFormdata({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setErrors({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }
  };

  const contactCards = [
    {
      icon: Mail,
      title: "Email Us",
      info: data?.email,
      type: "email"
    },
    {
      icon: Phone,
      title: "Call Us",
      info: data?.phone,
      type: "phone"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: data?.address,
      type: "text"
    },
    {
      icon: Clock,
      title: "Support Hours",
      info: data?.supportTime,
      type: "text"
    }
  ];

  const socialIcons = [
    { id: 1, Icontype: "Facebook", Icon: Facebook, link: data?.facebook ? data?.facebook : "#" },
    { id: 2, Icontype: "Twitter", Icon: Twitter, link: data?.twiter ? data?.twiter : "#" },
    { id: 3, Icontype: "Instagram", Icon: Instagram, link: data?.instagram ? data?.instagram : "#" },
    { id: 4, Icontype: "Linkedin", Icon: Linkedin, link: data?.linkedin ? data?.linkedin : "#" },
  ];

  return (
    <div className="min-h-screen">
      <Seo url={CONTACT_US_ROUTE} page="contact" />
      <Header isWhite={true} loading={isLoading} />
      <SectionHeader
        badge={data?.badge || "Contact us"}
        title={data?.title || "Get in Touch"}
        description={data?.description || "we are here to help you!"}
        variant="hero"
      />

      <section className="pt-12 md:py-12">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {contactCards.map((contact:any, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl shadow-lg text-center border hover:border-blue-800 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-soft rounded-lg flex items-center justify-center mx-auto mb-4">
                  <contact.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2 text-black">{contact.title}</h3>
                {contact.type === "email" && contact.info ? (
                  <a
                    href={`mailto:${contact.info}`}
                    className="text-black font-medium mb-1 block hover:text-primary transition-colors"
                  >
                    {contact.info}
                  </a>
                ) : contact.type === "phone" && contact.info ? (
                  <a
                    href={`tel:${contact.info}`}
                    className="text-black font-medium mb-1 block hover:text-primary transition-colors"
                  >
                    {contact.info}
                  </a>
                ) : (
                  <p className="text-black font-medium mb-1">
                    {contact.info}
                  </p>
                )}

                {contact?.subInfo && (
                  <p className="text-sm text-primary2">
                    {contact.subInfo}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="md:py-12">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                <h2 className="text-3xl font-bold mb-2 text-black">Send us a Message</h2>
                <p className="text-primary2 mb-8">Fill out the form below and our team will get back to you shortly</p>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-black">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formdata.firstName}
                        onChange={handlechange}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-black">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formdata.lastName}
                        onChange={handlechange}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formdata.email}
                      placeholder="john@example.com"
                      onChange={handlechange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-black">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formdata.phone}
                      placeholder="+1 (555) 123-4567"
                      onChange={handlechange}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-black">Subject *</Label>
                    <Select
                      value={formdata.subject}
                      onValueChange={(value) => {
                        setFormdata((prev) => ({ ...prev, subject: value }));
                        if (errors.subject) setErrors(prev => ({ ...prev, subject: "" }));
                      }}
                    >
                      <SelectTrigger className={errors.subject ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="sales">Sales Question</SelectItem>
                        <SelectItem value="billing">Billing Issue</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-black">Message *</Label>
                    <Textarea
                      id="message"
                      value={formdata.message}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      onChange={handlechange}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full gradient-primary">
                    <Send className="w-4 h-4 mr-2" />
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >


              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h3 className="font-bold text-xl mb-4 text-black">Connect With Us</h3>
                <p className="text-primary2 mb-6">
                  Follow us on social media for updates, tips, and community support
                </p>

                <div className="grid grid-cols-4 gap-4">
                  {socialIcons.map(({ id, Icon, link, Icontype }) => (
                    <a href={link}
                      key={id}
                      className="aspect-square bg-blue-soft rounded-md flex items-center justify-center"
                    >
                      {Icontype == "Twitter" ?
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-10 h-10 fill-current badge-hero-primary"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                        :
                        <Icon className="w-10 h-10 badge-hero-primary" />}
                    </a>
                  ))}
                </div>
              </div>
              {data?.map && (
                <div className="bg-white rounded-2xl aspect-video shadow-lg overflow-hidden border">
                  <iframe
                    src={data?.map}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  ></iframe>
                </div>
              )
              }
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}