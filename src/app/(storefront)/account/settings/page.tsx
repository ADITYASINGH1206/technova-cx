"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Save, Check } from "lucide-react";

export default function AccountSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface-primary">
      <div className="bg-surface-secondary border-b border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-display font-bold text-text-primary">Account Settings</h1>
          <p className="text-text-secondary mt-1">Manage your profile information</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <motion.form
          onSubmit={handleSave}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated p-6 space-y-6"
        >
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-white text-xl font-bold shadow-lg">
              AS
            </div>
            <div>
              <p className="font-semibold text-text-primary">Ananya Sharma</p>
              <p className="text-sm text-text-tertiary">Customer since Jan 2026</p>
            </div>
          </div>

          <hr className="border-border-subtle" />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-1.5 flex items-center gap-2 block">
                <User className="w-4 h-4 text-text-tertiary" /> Full Name
              </label>
              <input
                defaultValue="Ananya Sharma"
                className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm text-text-primary transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1.5 flex items-center gap-2 block">
                <Mail className="w-4 h-4 text-text-tertiary" /> Email
              </label>
              <input
                defaultValue="ananya@demo.com"
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm text-text-primary transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary mb-1.5 flex items-center gap-2 block">
                <Phone className="w-4 h-4 text-text-tertiary" /> Phone
              </label>
              <input
                defaultValue="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm text-text-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-text-primary mb-1.5 flex items-center gap-2 block">
              <MapPin className="w-4 h-4 text-text-tertiary" /> Default Shipping Address
            </label>
            <textarea
              defaultValue="42 MG Road, Bengaluru, Karnataka 560001"
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm text-text-primary transition-all resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" /> Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
