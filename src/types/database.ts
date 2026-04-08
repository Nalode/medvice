export interface Specialty {
  id: string;
  name: string;
  type: 'medical' | 'surgical' | 'biological' | 'other';
  icon?: string;
  description?: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  specialties: string[]; 
}

export interface Testimonial {
  id: string;
  content: string;
  authorName?: string;
  serviceName: string;
  hospitalName: string;
  rating: number;
  year?: string;
}

export interface HospitalService {
  id: string;
  hospitalId: string;
  specialtyId: string;
  serviceName: string;
  specialtyName: string;
  type: 'medical' | 'surgical' | 'biological' | 'other';
  reviewCount: number;
}
