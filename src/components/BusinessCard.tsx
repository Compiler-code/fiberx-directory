import { MapPin, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface Business {
  title: string;
  categoryName: string;
  address: string;
  neighborhood?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  countryCode?: string;
  website?: string;
  phone?: string;
  phoneUnformatted?: string;
  location: {
    lat: number;
    lng: number;
  };
  totalScore?: number;
  reviewsCount: number;
  openingHours: Array<{
    day: string;
    hours: string;
  }>;
  additionalInfo?: {
    [key: string]: Array<{
      [key: string]: boolean | string;
    }>;
  };
  placeId: string;
}

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/business/${encodeURIComponent(business.placeId)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="card-hover bg-card rounded-xl p-6 cursor-pointer group"
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
            {business.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-primary-light p-1.5 rounded-md">
              <Tag className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-caption font-medium text-text-secondary">{business.categoryName}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-surface p-1.5 rounded-md">
              <MapPin className="h-3.5 w-3.5 text-text-muted" />
            </div>
            <span className="text-caption">{business.city || business.address}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-card-border">
          <div className="flex items-center gap-3">
            {business.totalScore && (
              <div className="flex items-center bg-success/10 px-2 py-1 rounded-full">
                <span className="text-sm font-medium text-success">★</span>
                <span className="text-sm text-success ml-1 font-medium">{business.totalScore}</span>
              </div>
            )}
            <span className="text-xs text-text-muted">({business.reviewsCount} reviews)</span>
          </div>
          <div className="text-xs text-primary font-medium bg-primary-light px-3 py-1.5 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            View Details →
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;