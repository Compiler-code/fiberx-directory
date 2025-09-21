import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Star,
  MessageCircle,
  Clock,
  Building,
  Users,
  CreditCard,
  Shield,
  Accessibility,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Business } from "../components/BusinessCard";
import dataset from "../data/dataset.json";

const BusinessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    const businessData = dataset.find((b) => b.placeId === id);
    setBusiness(businessData as Business);
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-heading mb-4">
            Business Not Found
          </h2>
          <button onClick={handleBack} className="btn-primary">
            Return to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Directory
        </button>

        {/* Business Card */}
        <div className="bg-card border border-card-border rounded-xl shadow-lg overflow-hidden">
          {/* Hero Header */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 border-b border-card-border">
            <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              {business.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-sm">
                <Building className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  {business.categoryName}
                </span>
              </div>
              {business.totalScore && (
                <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold text-text-primary">
                    {business.totalScore}
                  </span>
                  <span className="text-text-muted">
                    ({business.reviewsCount} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Key Actions */}
            <div className="flex flex-wrap gap-3 mt-6">
              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Visit Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              )}
              {business.location && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${business.location.lat},${business.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface hover:bg-surface-hover border border-card-border text-text-primary font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  View on Map
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact & Location Info */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-heading mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Contact & Location
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-surface rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-text-muted mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-medium text-text-primary mb-1">
                            Address
                          </h3>
                          <p className="text-text-secondary text-sm">
                            {business.address}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-text-primary font-medium">
                              {business.city}
                            </span>
                            {business.state && (
                              <span className="text-text-muted">
                                • {business.state}
                              </span>
                            )}
                          </div>
                          {business.neighborhood && (
                            <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mt-2">
                              {business.neighborhood}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {business.phone && (
                      <div className="bg-surface rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-text-muted flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-text-primary mb-1">
                              Phone
                            </h3>
                            <a
                              href={`tel:${business.phone}`}
                              className="text-primary hover:text-primary-hover transition-colors font-medium"
                            >
                              {business.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Rating Section */}
                {business.totalScore && (
                  <div>
                    <h2 className="text-xl font-semibold text-heading mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Customer Reviews
                    </h2>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-yellow-600">
                            {business.totalScore}
                          </div>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(business.totalScore!)
                                    ? "text-yellow-500 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-text-secondary">
                            <Users className="h-4 w-4" />
                            <span className="font-medium">
                              {business.reviewsCount} customer reviews
                            </span>
                          </div>
                          <p className="text-sm text-text-muted mt-1">
                            Based on verified customer feedback
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Opening Hours */}
                {business.openingHours && business.openingHours.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-heading mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Opening Hours
                    </h2>
                    <div className="bg-surface rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {business.openingHours.map((schedule, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center py-2 md:flex-col"
                          >
                            <span className="font-medium text-text-primary">
                              {schedule.day}
                            </span>
                            <span
                              className={`text-sm px-3 py-1 rounded-full text-center ${
                                schedule.hours.toLowerCase().includes("closed")
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {schedule.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                {business.additionalInfo &&
                  Object.keys(business.additionalInfo).length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold text-heading mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Services & Amenities
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(business.additionalInfo).map(
                          ([category, items]) => (
                            <div
                              key={category}
                              className="bg-surface rounded-lg p-4"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                {category.toLowerCase().includes("payment") && (
                                  <CreditCard className="h-4 w-4 text-primary" />
                                )}
                                {category
                                  .toLowerCase()
                                  .includes("accessibility") && (
                                  <Accessibility className="h-4 w-4 text-primary" />
                                )}
                                {!category.toLowerCase().includes("payment") &&
                                  !category
                                    .toLowerCase()
                                    .includes("accessibility") && (
                                    <Shield className="h-4 w-4 text-primary" />
                                  )}
                                <h3 className="font-medium text-text-primary">
                                  {category}
                                </h3>
                              </div>
                              <div className="space-y-2">
                                {items.map((item, index) => (
                                  <div key={index} className="space-y-1">
                                    {Object.entries(item).map(
                                      ([key, value]) => (
                                        <div
                                          key={key}
                                          className="flex items-center justify-between"
                                        >
                                          <span className="text-sm text-text-secondary">
                                            {key}
                                          </span>
                                          <span
                                            className={`text-xs px-2 py-1 rounded-full ${
                                              value
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                          >
                                            {value
                                              ? "Available"
                                              : "Not Available"}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
