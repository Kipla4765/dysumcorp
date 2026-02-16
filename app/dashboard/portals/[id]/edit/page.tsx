"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

export default function EditPortalPage() {
  const router = useRouter();
  const params = useParams();
  const portalId = params?.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [portal, setPortal] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    primaryColor: "#3b82f6",
    textColor: "#0f172a",
    backgroundColor: "#ffffff",
    cardBackgroundColor: "#ffffff",
    customDomain: "",
    password: "",
    requireClientName: true,
    requireClientEmail: false,
    maxFileSize: 50,
    allowedFileTypes: [] as string[],
    welcomeMessage: "",
    submitButtonText: "Initialize Transfer",
    successMessage: "Transmission Verified",
  });

  useEffect(() => {
    if (portalId) {
      fetchPortal();
    }
  }, [portalId]);

  const fetchPortal = async () => {
    try {
      const response = await fetch(`/api/portals/${portalId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch portal");
      }

      const data = await response.json();
      const p = data.portal;
      
      setPortal(p);
      
      // Pre-fill form with portal data
      setFormData({
        name: p.name || "",
        primaryColor: p.primaryColor || "#3b82f6",
        textColor: p.textColor || "#0f172a",
        backgroundColor: p.backgroundColor || "#ffffff",
        cardBackgroundColor: p.cardBackgroundColor || "#ffffff",
        customDomain: p.customDomain || "",
        password: "", // Don't pre-fill password for security
        requireClientName: p.requireClientName ?? true,
        requireClientEmail: p.requireClientEmail ?? false,
        maxFileSize: p.maxFileSize ? parseInt(p.maxFileSize) / (1024 * 1024) : 50,
        allowedFileTypes: p.allowedFileTypes || [],
        welcomeMessage: p.welcomeMessage || "",
        submitButtonText: p.submitButtonText || "Initialize Transfer",
        successMessage: p.successMessage || "Transmission Verified",
      });
    } catch (error) {
      console.error("Error fetching portal:", error);
      setError("Failed to load portal");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await fetch(`/api/portals/${portalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          primaryColor: formData.primaryColor,
          textColor: formData.textColor,
          backgroundColor: formData.backgroundColor,
          cardBackgroundColor: formData.cardBackgroundColor,
          customDomain: formData.customDomain || null,
          password: formData.password || null,
          requireClientName: formData.requireClientName,
          requireClientEmail: formData.requireClientEmail,
          maxFileSize: formData.maxFileSize * 1024 * 1024, // Convert MB to bytes
          allowedFileTypes: formData.allowedFileTypes,
          welcomeMessage: formData.welcomeMessage || null,
          submitButtonText: formData.submitButtonText,
          successMessage: formData.successMessage,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update portal");
      }

      router.push("/dashboard/portals");
      router.refresh();
    } catch (error) {
      console.error("Failed to update portal:", error);
      setError(error instanceof Error ? error.message : "Failed to update portal");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error && !portal) {
    return (
      <div className="space-y-4">
        <Link
          className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium text-sm"
          href="/dashboard/portals"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Portals
        </Link>
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Failed to Load Portal
          </h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <Link
        className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium text-sm mb-8"
        href="/dashboard/portals"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Portals
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Edit Portal
        </h1>
        <p className="text-muted-foreground mt-1">
          Update settings for {portal?.name}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Identity Section */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Identity</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Portal Name
              </label>
              <input
                required
                className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:bg-card focus:ring-2 focus:ring-ring transition-all outline-none font-medium text-foreground"
                placeholder="e.g. Project Delivery Materials"
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Portal URL
              </label>
              <div className="flex items-stretch shadow-sm rounded-xl">
                <div className="px-4 flex items-center bg-muted border border-r-0 border-border rounded-l-xl text-muted-foreground text-sm font-medium">
                  /portal/
                </div>
                <input
                  disabled
                  className="flex-1 px-4 py-3 bg-muted border border-border rounded-r-xl font-medium text-muted-foreground cursor-not-allowed"
                  type="text"
                  value={portal?.slug || ""}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Portal URL cannot be changed after creation
              </p>
            </div>
          </div>
        </div>

        {/* Branding Section */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Branding</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Color */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Primary Color
                </label>
                <div className="flex gap-2">
                  <div className="relative group">
                    <div
                      className="w-12 h-12 rounded-xl border-2 border-border cursor-pointer transition-all hover:scale-105"
                      style={{ backgroundColor: formData.primaryColor }}
                      onClick={() => document.getElementById("primaryColorInput")?.click()}
                    />
                    <input
                      id="primaryColorInput"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => updateFormData("primaryColor", e.target.value)}
                    />
                  </div>
                  <input
                    className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl focus:bg-card focus:ring-2 focus:ring-ring transition-all outline-none font-medium text-foreground"
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) => updateFormData("primaryColor", e.target.value)}
                  />
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Text Color
                </label>
                <div className="flex gap-2">
                  <div className="relative group">
                    <div
                      className="w-12 h-12 rounded-xl border-2 border-border cursor-pointer transition-all hover:scale-105"
                      style={{ backgroundColor: formData.textColor }}
                      onClick={() => document.getElementById("textColorInput")?.click()}
                    />
                    <input
                      id="textColorInput"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      type="color"
                      value={formData.textColor}
                      onChange={(e) => updateFormData("textColor", e.target.value)}
                    />
                  </div>
                  <input
                    className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl focus:bg-card focus:ring-2 focus:ring-ring transition-all outline-none font-medium text-foreground"
                    type="text"
                    value={formData.textColor}
                    onChange={(e) => updateFormData("textColor", e.target.value)}
                  />
                </div>
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Background
                </label>
                <div className="flex gap-2">
                  <div className="relative group">
                    <div
                      className="w-12 h-12 rounded-xl border-2 border-border cursor-pointer transition-all hover:scale-105"
                      style={{ backgroundColor: formData.backgroundColor }}
                      onClick={() => document.getElementById("backgroundColorInput")?.click()}
                    />
                    <input
                      id="backgroundColorInput"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      type="color"
                      value={formData.backgroundColor}
                      onChange={(e) => updateFormData("backgroundColor", e.target.value)}
                    />
                  </div>
                  <input
                    className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl focus:bg-card focus:ring-2 focus:ring-ring transition-all outline-none font-medium text-foreground"
                    type="text"
                    value={formData.backgroundColor}
                    onChange={(e) => updateFormData("backgroundColor", e.target.value)}
                  />
                </div>
              </div>

              {/* Card Background Color */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Card Background
                </label>
                <div className="flex gap-2">
                  <div className="relative group">
                    <div
                      className="w-12 h-12 rounded-xl border-2 border-border cursor-pointer transition-all hover:scale-105"
                      style={{ backgroundColor: formData.cardBackgroundColor }}
                      onClick={() => document.getElementById("cardBackgroundColorInput")?.click()}
                    />
                    <input
                      id="cardBackgroundColorInput"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      type="color"
                      value={formData.cardBackgroundColor}
                      onChange={(e) => updateFormData("cardBackgroundColor", e.target.value)}
                    />
                  </div>
                  <input
                    className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl focus:bg-card focus:ring-2 focus:ring-ring transition-all outline-none font-medium text-foreground"
                    type="text"
                    value={formData.cardBackgroundColor}
                    onChange={(e) => updateFormData("cardBackgroundColor", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Custom Domain (Optional)
              </label>
              <input
                className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:bg-card focus:ring-2 focus:ring-ring transition-all outline-none font-medium text-foreground"
                placeholder="e.g., portal.acmecorp.com"
                type="text"
                value={formData.customDomain}
                onChange={(e) => updateFormData("customDomain", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Security</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Max File Size (MB)
                </label>
                <input
                  type="number"
                  value={formData.maxFileSize}
                  onChange={(e) => updateFormData("maxFileSize", parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-ring transition-all outline-none font-semibold text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Access Password (Optional)
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="Leave blank to keep current"
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-ring transition-all outline-none font-semibold text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                Client Data Requirements
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => updateFormData("requireClientName", !formData.requireClientName)}
                  className={`flex-1 px-4 py-3 rounded-xl border font-bold text-sm transition-all ${
                    formData.requireClientName
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
                  }`}
                >
                  Require Name
                </button>
                <button
                  type="button"
                  onClick={() => updateFormData("requireClientEmail", !formData.requireClientEmail)}
                  className={`flex-1 px-4 py-3 rounded-xl border font-bold text-sm transition-all ${
                    formData.requireClientEmail
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
                  }`}
                >
                  Require Email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Section */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Messaging</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Welcome Message
              </label>
              <textarea
                className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:bg-card focus:ring-2 focus:ring-ring transition-all outline-none font-medium text-foreground resize-none"
                placeholder="Welcome! Please upload your documents for review."
                rows={3}
                value={formData.welcomeMessage}
                onChange={(e) => updateFormData("welcomeMessage", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Submit Button Label
                </label>
                <input
                  type="text"
                  value={formData.submitButtonText}
                  onChange={(e) => updateFormData("submitButtonText", e.target.value)}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-ring transition-all outline-none font-semibold text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Success Message
                </label>
                <input
                  type="text"
                  value={formData.successMessage}
                  onChange={(e) => updateFormData("successMessage", e.target.value)}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-ring transition-all outline-none font-semibold text-foreground"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-destructive font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Link
            className="px-6 py-3 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all font-bold text-sm"
            href="/dashboard/portals"
          >
            Cancel
          </Link>
          <button
            className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95 disabled:opacity-50 font-bold text-sm"
            disabled={saving}
            type="submit"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
