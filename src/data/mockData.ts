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

export const servicesData: HospitalService[] = [
  { id: 'srv_blida_1', hospitalId: 'blida', specialtyId: 'anap', serviceName: 'Anatomie Cytologie Pathologique', specialtyName: 'Anatomie Cytologie Pathologique', type: 'biological', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_2', hospitalId: 'blida', specialtyId: 'anes', serviceName: 'Anesthésie Réanimation', specialtyName: 'Anesthésie Réanimation', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_3', hospitalId: 'blida', specialtyId: 'bio', serviceName: 'Biochimie', specialtyName: 'Biochimie', type: 'biological', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_4', hospitalId: 'blida', specialtyId: 'cardio', serviceName: 'Cardiologie', specialtyName: 'Cardiologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_5', hospitalId: 'blida', specialtyId: 'chircard', serviceName: 'Chirurgie Cardiaque', specialtyName: 'Chirurgie Cardiaque', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_6', hospitalId: 'blida', specialtyId: 'chirneuro', serviceName: 'Chirurgie Neurologique', specialtyName: 'Chirurgie Neurologique', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_7', hospitalId: 'blida', specialtyId: 'chirortho', serviceName: 'Chirurgie Orthopédique et Traumatologie', specialtyName: 'Chirurgie Orthopédique et Traumatologie', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_8', hospitalId: 'blida', specialtyId: 'chirped', serviceName: 'Chirurgie Pédiatrique', specialtyName: 'Chirurgie Pédiatrique', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_9', hospitalId: 'blida', specialtyId: 'chirvisc', serviceName: 'Chirurgie Viscérale et Digestive', specialtyName: 'Chirurgie Viscérale et Digestive', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_10', hospitalId: 'blida', specialtyId: 'epidemio', serviceName: 'Epidémiologie et Médecine Préventive', specialtyName: 'Epidémiologie et Médecine Préventive', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_11', hospitalId: 'blida', specialtyId: 'gyneco', serviceName: 'Gynécologie Obstétrique', specialtyName: 'Gynécologie Obstétrique', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_12', hospitalId: 'blida', specialtyId: 'hemato', serviceName: 'Hématologie', specialtyName: 'Hématologie', type: 'biological', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_13', hospitalId: 'blida', specialtyId: 'hemobio', serviceName: 'Hémobiologie et Transfusion Sanguine', specialtyName: 'Hémobiologie et Transfusion Sanguine', type: 'biological', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_14', hospitalId: 'blida', specialtyId: 'imagerie', serviceName: 'Imagerie Médicale et Radiologie', specialtyName: 'Imagerie Médicale et Radiologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_15', hospitalId: 'blida', specialtyId: 'immuno', serviceName: 'Immunologie', specialtyName: 'Immunologie', type: 'biological', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_16', hospitalId: 'blida', specialtyId: 'medtrav', serviceName: 'Médecine du Travail', specialtyName: 'Médecine du Travail', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_17', hospitalId: 'blida', specialtyId: 'medurg', serviceName: 'Médecine d\'Urgence', specialtyName: 'Médecine d\'Urgence', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_18', hospitalId: 'blida', specialtyId: 'medint', serviceName: 'Médecine Interne', specialtyName: 'Médecine Interne', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_19', hospitalId: 'blida', specialtyId: 'medleg', serviceName: 'Médecine Légale', specialtyName: 'Médecine Légale', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_20', hospitalId: 'blida', specialtyId: 'medphys', serviceName: 'Médecine Physique et Réadaptation', specialtyName: 'Médecine Physique et Réadaptation', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_21', hospitalId: 'blida', specialtyId: 'microbio', serviceName: 'Microbiologie', specialtyName: 'Microbiologie', type: 'biological', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_22', hospitalId: 'blida', specialtyId: 'neuro', serviceName: 'Neurologie', specialtyName: 'Neurologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_23', hospitalId: 'blida', specialtyId: 'ophtalmo', serviceName: 'Ophtalmologie', specialtyName: 'Ophtalmologie', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_24', hospitalId: 'blida', specialtyId: 'orl', serviceName: 'Oto-Rhino-Laryngologie', specialtyName: 'Oto-Rhino-Laryngologie', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_25', hospitalId: 'blida', specialtyId: 'parasito', serviceName: 'Parasitologie Mycologie', specialtyName: 'Parasitologie Mycologie', type: 'biological', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_26', hospitalId: 'blida', specialtyId: 'pediatrie', serviceName: 'Pédiatrie', specialtyName: 'Pédiatrie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_blida_27', hospitalId: 'blida', specialtyId: 'pharmaco', serviceName: 'Pharmacologie Clinique', specialtyName: 'Pharmacologie Clinique', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_28', hospitalId: 'douera', specialtyId: 'anap', serviceName: 'Anatomie Cytologie Pathologique', specialtyName: 'Anatomie Cytologie Pathologique', type: 'biological', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_29', hospitalId: 'douera', specialtyId: 'anes', serviceName: 'Anesthésie Réanimation', specialtyName: 'Anesthésie Réanimation', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_30', hospitalId: 'douera', specialtyId: 'chirmax', serviceName: 'Chirurgie Maxillo-faciale', specialtyName: 'Chirurgie Maxillo-faciale', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_31', hospitalId: 'douera', specialtyId: 'chirneuro', serviceName: 'Chirurgie Neurologique', specialtyName: 'Chirurgie Neurologique', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_32', hospitalId: 'douera', specialtyId: 'chirortho', serviceName: 'Chirurgie Orthopédique et Traumatologie', specialtyName: 'Chirurgie Orthopédique et Traumatologie', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_33', hospitalId: 'douera', specialtyId: 'chirped', serviceName: 'Chirurgie Pédiatrique', specialtyName: 'Chirurgie Pédiatrique', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_34', hospitalId: 'douera', specialtyId: 'chirvisc', serviceName: 'Chirurgie Viscérale et Digestive', specialtyName: 'Chirurgie Viscérale et Digestive', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_35', hospitalId: 'douera', specialtyId: 'epidemio', serviceName: 'Epidémiologie et Médecine Préventive', specialtyName: 'Epidémiologie et Médecine Préventive', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_36', hospitalId: 'douera', specialtyId: 'gyneco', serviceName: 'Gynécologie Obstétrique', specialtyName: 'Gynécologie Obstétrique', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_37', hospitalId: 'douera', specialtyId: 'medtrav', serviceName: 'Médecine du Travail', specialtyName: 'Médecine du Travail', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_38', hospitalId: 'douera', specialtyId: 'medurg', serviceName: 'Médecine d\'Urgence', specialtyName: 'Médecine d\'Urgence', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_39', hospitalId: 'douera', specialtyId: 'medint', serviceName: 'Médecine Interne', specialtyName: 'Médecine Interne', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_40', hospitalId: 'douera', specialtyId: 'medleg', serviceName: 'Médecine Légale', specialtyName: 'Médecine Légale', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_41', hospitalId: 'douera', specialtyId: 'medphys', serviceName: 'Médecine Physique et Réadaptation', specialtyName: 'Médecine Physique et Réadaptation', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_42', hospitalId: 'douera', specialtyId: 'pediatrie', serviceName: 'Pédiatrie', specialtyName: 'Pédiatrie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_douera_43', hospitalId: 'douera', specialtyId: 'rhumato', serviceName: 'Rhumatologie', specialtyName: 'Rhumatologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_44', hospitalId: 'hmru', specialtyId: 'anes', serviceName: 'Anesthésie Réanimation', specialtyName: 'Anesthésie Réanimation', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_45', hospitalId: 'hmru', specialtyId: 'cardio', serviceName: 'Cardiologie', specialtyName: 'Cardiologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_46', hospitalId: 'hmru', specialtyId: 'chirortho', serviceName: 'Chirurgie Orthopédique et Traumatologie', specialtyName: 'Chirurgie Orthopédique et Traumatologie', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_47', hospitalId: 'hmru', specialtyId: 'chiruro', serviceName: 'Chirurgie Urologique', specialtyName: 'Chirurgie Urologique', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_48', hospitalId: 'hmru', specialtyId: 'chirvisc', serviceName: 'Chirurgie Viscérale et Digestive', specialtyName: 'Chirurgie Viscérale et Digestive', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_49', hospitalId: 'hmru', specialtyId: 'hepato', serviceName: 'Hépato-Gastro-Entérologie', specialtyName: 'Hépato-Gastro-Entérologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_50', hospitalId: 'hmru', specialtyId: 'imagerie', serviceName: 'Imagerie Médicale et Radiologie', specialtyName: 'Imagerie Médicale et Radiologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_51', hospitalId: 'hmru', specialtyId: 'medint', serviceName: 'Médecine Interne', specialtyName: 'Médecine Interne', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_52', hospitalId: 'hmru', specialtyId: 'nephro', serviceName: 'Néphrologie', specialtyName: 'Néphrologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_53', hospitalId: 'hmru', specialtyId: 'onco', serviceName: 'Oncologie Médicale', specialtyName: 'Oncologie Médicale', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_54', hospitalId: 'hmru', specialtyId: 'ophtalmo', serviceName: 'Ophtalmologie', specialtyName: 'Ophtalmologie', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_hmru_55', hospitalId: 'hmru', specialtyId: 'orl', serviceName: 'Oto-Rhino-Laryngologie', specialtyName: 'Oto-Rhino-Laryngologie', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_clcc_56', hospitalId: 'clcc', specialtyId: 'anes', serviceName: 'Anesthésie Réanimation', specialtyName: 'Anesthésie Réanimation', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_clcc_57', hospitalId: 'clcc', specialtyId: 'chirvisc', serviceName: 'Chirurgie Viscérale et Digestive', specialtyName: 'Chirurgie Viscérale et Digestive', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_clcc_58', hospitalId: 'clcc', specialtyId: 'hemato', serviceName: 'Hématologie', specialtyName: 'Hématologie', type: 'biological', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_clcc_59', hospitalId: 'clcc', specialtyId: 'immuno', serviceName: 'Immunologie', specialtyName: 'Immunologie', type: 'biological', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_clcc_60', hospitalId: 'clcc', specialtyId: 'onco', serviceName: 'Oncologie Médicale', specialtyName: 'Oncologie Médicale', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_clcc_61', hospitalId: 'clcc', specialtyId: 'radiotherapie', serviceName: 'Radiothérapie Oncologie', specialtyName: 'Radiothérapie Oncologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tipaza_62', hospitalId: 'tipaza', specialtyId: 'cardio', serviceName: 'Cardiologie', specialtyName: 'Cardiologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tipaza_63', hospitalId: 'tipaza', specialtyId: 'chirvisc', serviceName: 'Chirurgie Viscérale et Digestive', specialtyName: 'Chirurgie Viscérale et Digestive', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tipaza_64', hospitalId: 'tipaza', specialtyId: 'epidemio', serviceName: 'Epidémiologie et Médecine Préventive', specialtyName: 'Epidémiologie et Médecine Préventive', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tipaza_65', hospitalId: 'tipaza', specialtyId: 'gyneco', serviceName: 'Gynécologie Obstétrique', specialtyName: 'Gynécologie Obstétrique', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tipaza_66', hospitalId: 'tipaza', specialtyId: 'pediatrie', serviceName: 'Pédiatrie', specialtyName: 'Pédiatrie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tipaza_67', hospitalId: 'tipaza', specialtyId: 'pedopsy', serviceName: 'Pédopsychiatrie', specialtyName: 'Pédopsychiatrie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tipaza_68', hospitalId: 'tipaza', specialtyId: 'psychiatrie', serviceName: 'Psychiatrie', specialtyName: 'Psychiatrie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tot_69', hospitalId: 'tot', specialtyId: 'anes', serviceName: 'Anesthésie Réanimation', specialtyName: 'Anesthésie Réanimation', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tot_70', hospitalId: 'tot', specialtyId: 'chiruro', serviceName: 'Chirurgie Urologique', specialtyName: 'Chirurgie Urologique', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tot_71', hospitalId: 'tot', specialtyId: 'chirvasc', serviceName: 'Chirurgie Vasculaire', specialtyName: 'Chirurgie Vasculaire', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tot_72', hospitalId: 'tot', specialtyId: 'chirvisc', serviceName: 'Chirurgie Viscérale et Digestive', specialtyName: 'Chirurgie Viscérale et Digestive', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_tot_73', hospitalId: 'tot', specialtyId: 'nephro', serviceName: 'Néphrologie', specialtyName: 'Néphrologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_sidi_74', hospitalId: 'sidi', specialtyId: 'anes', serviceName: 'Anesthésie Réanimation', specialtyName: 'Anesthésie Réanimation', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_sidi_75', hospitalId: 'sidi', specialtyId: 'chirmax', serviceName: 'Chirurgie Maxillo-faciale', specialtyName: 'Chirurgie Maxillo-faciale', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_sidi_76', hospitalId: 'sidi', specialtyId: 'onco', serviceName: 'Oncologie Médicale', specialtyName: 'Oncologie Médicale', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_psy_77', hospitalId: 'psy', specialtyId: 'pedopsy', serviceName: 'Pédopsychiatrie', specialtyName: 'Pédopsychiatrie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_psy_78', hospitalId: 'psy', specialtyId: 'psychiatrie', serviceName: 'Psychiatrie « C »', specialtyName: 'Psychiatrie « C »', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_psy_79', hospitalId: 'psy', specialtyId: 'psychiatrie', serviceName: 'Psychiatrie « D »', specialtyName: 'Psychiatrie « D »', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_psy_80', hospitalId: 'psy', specialtyId: 'psychiatrie', serviceName: 'Psychiatrie Médico-Légale', specialtyName: 'Psychiatrie Médico-Légale', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_psy_81', hospitalId: 'psy', specialtyId: 'psychiatrie', serviceName: 'Addictologie', specialtyName: 'Addictologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_cherchel_82', hospitalId: 'cherchel', specialtyId: 'chirneuro', serviceName: 'Chirurgie Neurologique', specialtyName: 'Chirurgie Neurologique', type: 'surgical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_cherchel_83', hospitalId: 'cherchel', specialtyId: 'neuro', serviceName: 'Neurologie', specialtyName: 'Neurologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 },
  { id: 'srv_trichine_84', hospitalId: 'trichine', specialtyId: 'pneumo', serviceName: 'Pneumo-Phtisiologie', specialtyName: 'Pneumo-Phtisiologie', type: 'medical', reviewCount: Math.floor(Math.random() * 8) + 1 }
];

export const specialtiesData: Specialty[] = [
  { id: 'anap', name: 'Anatomie Cytologie Pathologique', type: 'biological', description: 'Étude morphologique des anomalies des cellules et des tissus.' },
  { id: 'anes', name: 'Anesthésie Réanimation', type: 'medical', description: 'Médecine périopératoire et prise en charge des détresses vitales.' },
  { id: 'bio', name: 'Biochimie', type: 'biological', description: 'Analyse des processus chimiques au sein des organismes vivants.' },
  { id: 'cardio', name: 'Cardiologie', type: 'medical', description: 'Spécialité traitant les affections du cœur et des vaisseaux.' },
  { id: 'chircard', name: 'Chirurgie Cardiaque', type: 'surgical', description: 'Interventions chirurgicales sur le cœur.' },
  { id: 'chirmax', name: 'Chirurgie Maxillo-faciale', type: 'surgical', description: 'Chirurgie de la face et de la cavité buccale.' },
  { id: 'chirneuro', name: 'Chirurgie Neurologique', type: 'surgical', description: 'Interventions sur le système nerveux.' },
  { id: 'chirortho', name: 'Chirurgie Orthopédique', type: 'surgical', description: 'Chirurgie des os et de l\'appareil locomoteur.' },
  { id: 'chirped', name: 'Chirurgie Pédiatrique', type: 'surgical', description: 'Chirurgie dédiée à l\'enfant et à l\'adolescent.' },
  { id: 'chiruro', name: 'Chirurgie Urologique', type: 'surgical', description: 'Affections chirurgicales de l\'appareil urinaire.' },
  { id: 'chirvasc', name: 'Chirurgie Vasculaire', type: 'surgical', description: 'Chirurgie des vaisseaux sanguins.' },
  { id: 'chirvisc', name: 'Chirurgie Viscérale', type: 'surgical', description: 'Interventions sur les organes de l\'appareil digestif.' },
  { id: 'epidemio', name: 'Epidémiologie', type: 'medical', description: 'Étude des facteurs influençant la santé et les maladies.' },
  { id: 'gyneco', name: 'Gynécologie Obstétrique', type: 'surgical', description: 'Médecine spécialisée dans l\'appareil génital féminin et la grossesse.' },
  { id: 'hemato', name: 'Hématologie', type: 'biological', description: 'Étude du sang et de ses affections.' },
  { id: 'hemobio', name: 'Hémobiologie', type: 'biological', description: 'Transfusion sanguine et thérapies cellulaires.' },
  { id: 'hepato', name: 'Hépato-Gastro-Entérologie', type: 'medical', description: 'Maladies du tube digestif, du foie et du pancréas.' },
  { id: 'imagerie', name: 'Imagerie Médicale', type: 'medical', description: 'Diagnostic par les rayons X, ultrasons et résonance magnétique.' },
  { id: 'immuno', name: 'Immunologie', type: 'biological', description: 'Étude du système immunitaire.' },
  { id: 'medtrav', name: 'Médecine du Travail', type: 'medical', description: 'Prévention des risques professionnels.' },
  { id: 'medurg', name: 'Médecine d\'Urgence', type: 'medical', description: 'Prise en charge immédiate des patients en situation critique.' },
  { id: 'medint', name: 'Médecine Interne', type: 'medical', description: 'Prise en charge globale des polypathologies.' },
  { id: 'medleg', name: 'Médecine Légale', type: 'medical', description: 'Application des connaissances médicales au droit.' },
  { id: 'medphys', name: 'Médecine Physique', type: 'medical', description: 'Réadaptation et récupération fonctionnelle.' },
  { id: 'microbio', name: 'Microbiologie', type: 'biological', description: 'Étude des micro-organismes infectieux.' },
  { id: 'nephro', name: 'Néphrologie', type: 'medical', description: 'Maladies des reins.' },
  { id: 'neuro', name: 'Neurologie', type: 'medical', description: 'Maladies du système nerveux central et périphérique.' },
  { id: 'onco', name: 'Oncologie Médicale', type: 'medical', description: 'Diagnostic et traitement médical des cancers.' },
  { id: 'ophtalmo', name: 'Ophtalmologie', type: 'surgical', description: 'Maladies de l\'œil et de la vision.' },
  { id: 'orl', name: 'Oto-Rhino-Laryngologie', type: 'surgical', description: 'Affections de l\'oreille, du nez et de la gorge.' },
  { id: 'parasito', name: 'Parasitologie', type: 'biological', description: 'Étude des parasites et champignons pathogènes.' },
  { id: 'pediatrie', name: 'Pédiatrie', type: 'medical', description: 'Médecine de l\'enfant jusqu\'à l\'adolescence.' },
  { id: 'pedopsy', name: 'Pédopsychiatrie', type: 'medical', description: 'Troubles mentaux chez l\'enfant et l\'adolescent.' },
  { id: 'pharmaco', name: 'Pharmacologie Clinique', type: 'biological', description: 'Étude des médicaments et de leur utilisation.' },
  { id: 'pneumo', name: 'Pneumo-Phtisiologie', type: 'medical', description: 'Maladies des poumons et voies respiratoires.' },
  { id: 'psychiatrie', name: 'Psychiatrie', type: 'medical', description: 'Diagnostic et traitement des maladies mentales.' },
  { id: 'radiotherapie', name: 'Radiothérapie', type: 'medical', description: 'Traitement local des cancers par rayonnements.' },
  { id: 'rhumato', name: 'Rhumatologie', type: 'medical', description: 'Maladies des os, des articulations et des muscles.' },
];

export const hospitalsData: Hospital[] = [
  { id: 'blida', name: 'CHU Blida (Frantz Fanon)', city: 'Blida', lat: 36.47, lng: 2.82, specialties: ['anap','anes','bio','cardio','chircard','chirneuro','chirortho','chirped','chirvisc','epidemio','gyneco','hemato','hemobio','imagerie','immuno','medtrav','medurg','medint','medleg','medphys','microbio','neuro','ophtalmo','orl','parasito','pediatrie','pharmaco'] },
  { id: 'douera', name: 'CHU Douéra', city: 'Douéra', lat: 36.66, lng: 2.82, specialties: ['anap','anes','chirmax','chirneuro','chirortho','chirped','chirvisc','epidemio','gyneco','medtrav','medurg','medint','medleg','medphys','pediatrie','rhumato'] },
  { id: 'hmru', name: 'HMRU Blida', city: 'Blida', lat: 36.47, lng: 2.82, specialties: ['anes','cardio','chirortho','chiruro','chirvisc','hepato','imagerie','medint','nephro','onco','ophtalmo','orl'] },
  { id: 'clcc', name: 'CLCC Blida (CAC)', city: 'Blida', lat: 36.47, lng: 2.82, specialties: ['anes','chirvisc','hemato','immuno','onco','radiotherapie'] },
  { id: 'tipaza', name: 'EHS Tipaza', city: 'Tipaza', lat: 36.59, lng: 2.82, specialties: ['cardio','chirvisc','epidemio','gyneco','pediatrie','pedopsy','psychiatrie'] },
  { id: 'tot', name: 'EHS TOT Blida', city: 'Blida', lat: 36.48, lng: 2.82, specialties: ['anes','chiruro','chirvasc','chirvisc','nephro'] },
  { id: 'sidi', name: 'EHS Sidi Ghiles', city: 'Tipaza', lat: 36.6, lng: 2.82, specialties: ['anes','chirmax','onco'] },
  { id: 'psy', name: 'EHS Psychiatrie Blida (Frantz Fanon)', city: 'Blida', lat: 36.47, lng: 2.82, specialties: ['pedopsy','psychiatrie'] },
  { id: 'cherchel', name: 'EHS Cherchel', city: 'Tipaza', lat: 36.6, lng: 2.82, specialties: ['chirneuro','neuro'] },
  { id: 'trichine', name: 'EPH Trichine (Faroudja)', city: 'Blida', lat: 36.47, lng: 2.82, specialties: ['pneumo'] }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    content: "The progress tracker is fantastic. It's motivating to see how much I've improved over time. The app has a great mix of challenging cases and theoretical depth, making my residency much more manageable.",
    authorName: "Dr. Amine",
    serviceName: "Cardiologie",
    hospitalName: "CHU Blida (Frantz Fanon)",
    rating: 4.9,
    year: "3ème année"
  },
  {
    id: 't_long_1',
    content: "Mon expérience au sein de ce service a été fondamentalement transformatrice. Dès le premier jour, l'exigence clinique et la rigueur diagnostique qui y règnent m'ont poussé dans mes derniers retranchements intellectuels. L'équipe médicale ne fait aucune concession sur la qualité des soins, ce qui crée un environnement où l'apprentissage est constant et intense.\n\nLa diversité des pathologies cardiaques rencontrées ici est sans équivalent. Des urgences rythmiques complexes aux prises en charge au long cours de l'insuffisance cardiaque terminale, chaque garde est une occasion en or d'acquérir des réflexes vitaux. Les réunions de concertation pluridisciplinaire sont de véritables masterclasses où chaque décision thérapeutique est justifiée par les données les plus récentes de l'evidence-based medicine.\n\nIl faut cependant souligner que le rythme est extrêmement soutenu. Les nuits sont courtes, et la charge mentale liée aux patients critiques en réanimation cardiaque demande une résilience psychologique importante. Néanmoins, l'encadrement par les seniors reste bienveillant et structurant.\n\nEn résumé, c'est un tremplin exceptionnel pour quiconque souhaite embrasser la cardiologie moderne à bras-le-corps, à condition d'être prêt à un dévouement total pendant plusieurs années.",
    authorName: "Dr. Ryad",
    serviceName: "Cardiologie",
    hospitalName: "CHU Blida (Frantz Fanon)",
    rating: 5.0,
    year: "4ème année"
  },
  {
    id: 't_long_2',
    content: "Travailler dans la périphérie apporte une perspective clinique souvent ignorée des grands centres universitaires. Ici, nous sommes en première ligne face à une population souvent mal préparée ou diagnostiquée tardivement, ce qui exige un sens clinique aiguisé pour repérer les complications cardiaques avancées dès la porte de l'hôpital.\n\nLes moyens d'exploration non invasifs sont limités, ce qui nous oblige à redevenir d'excellents cliniciens. Apprendre à décortiquer un souffle, à interpréter finement un tracé ECG sans l'aide immédiate d'une échographie de dernière génération forge une autonomie inestimable. C'est l'essence pure de la médecine clinique telle qu'elle devrait être enseignée.\n\nL'ambiance d'équipe est remarquable, presque familiale, contrastant avec l'anonymat des mégastructures. Le suivi en aval des patients chroniques crée une relation médecin-malade d'une grande richesse humaine. Chaque résident qui passe par ici ressort doté d'une confiance en soi renouvelée et d'une habileté à gérer les situations de crise avec les moyens du bord.\n\nJe recommande ce terrain de stage à tous ceux qui souhaitent réellement maîtriser l'art de la sémiologie clinique avant de se noyer dans l'hyper-spécialisation et la technologie d'exploration invasive.",
    authorName: "Médecin Anonyme",
    serviceName: "Cardiologie",
    hospitalName: "EHS Tipaza",
    rating: 4.2,
    year: "2ème année"
  },
  {
    id: 't_long_3',
    content: "L'institution a une identité propre, fortement marquée par la rigueur organisationnelle et la disponibilité constante. En tant que résident, on est propulsé très rapidement dans une logistique millimétrée où chaque geste compte, particulièrement en salle de cathétérisme. C'est un apprentissage à la dure, mais d'une efficacité redoutable pour la prise en charge de la maladie coronaire aiguë.\n\nLe volume d'activité en soins intensifs cardiologiques est spectaculaire. On observe, on assiste, puis on manipule très tôt, sous un contrôle strict mais formateur. Le débriefing post-garde est systématique et souvent sans filtre, ce qui peut piquer l'ego, mais qui garantit qu'aucune erreur ne passe à travers les mailles du filet. L'exigence de perfection est ici la norme absolue.\n\nCependant, il faut s'adapter à une hiérarchie très verticale. La flexibilité est faible et le paramétrage des tâches de recherche laisse peu de temps libre pour l'auto-formation académique hors du terrain. Il est crucial d'être organisé et de faire preuve d'abnégation.\n\nAu final, pour celui qui cherche une exposition massive à l'urgence cardiologique lourde et à la cardiologie interventionnelle de premier plan, c'est l'un des meilleurs terrains d'Alger, forgeant des praticiens aux réflexes chirurgicaux.",
    authorName: "Dr. Lilia K.",
    serviceName: "Cardiologie",
    hospitalName: "HMRU Blida",
    rating: 4.6,
    year: "3ème année"
  },
  {
    id: 't2',
    content: "The environment is heavily demanding but the training volume is insane. You get to see everything. Using this platform to filter out the noise and target exactly the service dynamics was life saving.",
    authorName: "Médecin Anonyme",
    serviceName: "Orthopédie",
    hospitalName: "CHU Douéra",
    rating: 3.2,
    year: "1ère année"
  },
  {
    id: 't3',
    content: "Absolutely phenomenal teaching staff. The progress tracker is fantastic. It's motivating to see how much I've improved over time. We handle heavy trauma, which builds enormous resilience.",
    authorName: "Dr. Sarah D.",
    serviceName: "Neurologie",
    hospitalName: "CHU Douéra",
    rating: 4.9,
    year: "2ème année"
  },
  {
    id: 't4',
    content: "The progress tracker is fantastic. It's motivating to see how much I've improved over time. A great mix of clinical exposure and academic backing. Guard frequency here is tough but very rewarding.",
    authorName: "Ali K.",
    serviceName: "Ophtalmologie",
    hospitalName: "HMRU Blida",
    rating: 3.2,
    year: "4ème année"
  },
  {
    id: 't5',
    content: "The progress tracker is fantastic. It's motivating to see how much I've improved over time. The app has a great mix of...",
    authorName: "Fatima Mohamed",
    serviceName: "Pédiatrie",
    hospitalName: "EHS Tipaza",
    rating: 4.9,
    year: "R1"
  },
  {
    id: 't6',
    content: "The progress tracker is fantastic. It's motivating to see how much I've improved over time. The app has a great mix of...",
    authorName: "Larry King",
    serviceName: "Chirurgie Viscérale",
    hospitalName: "EHS Sidi Ghiles",
    rating: 3.2,
    year: "R3"
  }
];
