import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      visaInfo: "Visa Information", 
      articles: "Articles",
      settings: "Settings",
      logout: "Logout",
      
      // Auth
      login: "Login",
      signup: "Sign Up",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      name: "Name",
      role: "Role",
      forgotPassword: "Forgot your password?",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
      signIn: "Sign in",
      createAccount: "Create Account",
      
      // Dashboard
      welcomeMessage: "Welcome to Embassy Administration Panel",
      totalApplications: "Total Applications",
      pendingReview: "Pending Review",
      approved: "Approved",
      rejected: "Rejected",
      recentApplications: "Recent Visa Applications",
      
      // Visa Info
      applicantName: "Applicant Name",
      passportNumber: "Passport Number",
      visaType: "Visa Type",
      status: "Status",
      submissionDate: "Submission Date",
      searchPlaceholder: "Search...",
      filterByStatus: "Filter by Status",
      allStatuses: "All Statuses",
      pending: "Pending",
      approvedStatus: "Approved",
      rejectedStatus: "Rejected",
      actions: "Actions",
      view: "View",
      
      // Articles
      articleManagement: "Article Management",
      addNewArticle: "Add New Article",
      title: "Title",
      content: "Content",
      featuredImage: "Featured Image",
      tags: "Tags",
      category: "Category",
      saveDraft: "Save Draft",
      publish: "Publish",
      published: "Published",
      draft: "Draft",
      author: "Author",
      date: "Date",
      edit: "Edit",
      delete: "Delete",
      
      // Profile
      profile: "Profile",
      adminUser: "Admin User",
      
      // Language
      language: "Language",
      english: "English",
      spanish: "Spanish", 
      turkish: "Turkish",
      french: "French",
      
      // Employees
      employees: "Employees",
      employeeManagement: "Employee Management",
      addEmployee: "Add Employee",
      employeeList: "Employee List",
      position: "Position",
      department: "Department",
      hireDate: "Hire Date",
      employeeId: "Employee ID",
      
      // Recruitment
      recruitment: "Recruitment",
      recruitmentManagement: "Recruitment Management",
      addCandidate: "Add Candidate",
      candidateList: "Candidate List",
      candidate: "Candidate",
      candidates: "Candidates",
      applicationStatus: "Application Status",
      interviewDate: "Interview Date",
      
      // In Country Check
      inCountryCheck: "In Country Check",
      inCountryCheckById: "In Country Check by ID",
      individualId: "Individual ID",
      nationality: "Nationality",
      location: "Location",
      checkStatus: "Check Status",
      active: "Active",
      inactive: "Inactive",
      
      // Visa Applications
      visaApplications: "Visa Applications",
      businessVisas: "Business Visas",
      studentVisas: "Student Visas",
      touristVisas: "Tourist Visas",
      businessVisaApplications: "Business Visa Applications",
      studentVisaApplications: "Student Visa Applications",
      touristVisaApplications: "Tourist Visa Applications",
      
      // Contacts
      contacts: "Contacts",
      contactManagement: "Contact Management",
      addContact: "Add Contact",
      contactList: "Contact List",
      phone: "Phone",
      
      // Common actions
      filterByName: "Filter by Name",
      filterById: "Filter by ID",
      noDataFound: "No data found",
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      close: "Close"
    }
  },
  es: {
    translation: {
      // Navigation
      dashboard: "Panel de Control",
      visaInfo: "Información de Visa",
      articles: "Artículos", 
      settings: "Configuración",
      logout: "Cerrar Sesión",
      
      // Auth
      login: "Iniciar Sesión",
      signup: "Registrarse",
      email: "Correo Electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar Contraseña",
      name: "Nombre",
      role: "Rol",
      forgotPassword: "¿Olvidaste tu contraseña?",
      dontHaveAccount: "¿No tienes una cuenta?",
      alreadyHaveAccount: "¿Ya tienes una cuenta?",
      signIn: "Iniciar Sesión",
      createAccount: "Crear Cuenta",
      
      // Dashboard
      welcomeMessage: "Bienvenido al Panel de Administración de la Embajada",
      totalApplications: "Total de Solicitudes",
      pendingReview: "Pendiente de Revisión",
      approved: "Aprobado",
      rejected: "Rechazado",
      recentApplications: "Solicitudes de Visa Recientes",
      
      // Visa Info
      applicantName: "Nombre del Solicitante",
      passportNumber: "Número de Pasaporte",
      visaType: "Tipo de Visa",
      status: "Estado",
      submissionDate: "Fecha de Envío",
      searchPlaceholder: "Buscar...",
      filterByStatus: "Filtrar por Estado",
      allStatuses: "Todos los Estados",
      pending: "Pendiente",
      approvedStatus: "Aprobado",
      rejectedStatus: "Rechazado",
      actions: "Acciones",
      view: "Ver",
      
      // Articles
      articleManagement: "Gestión de Artículos",
      addNewArticle: "Agregar Nuevo Artículo",
      title: "Título",
      content: "Contenido",
      featuredImage: "Imagen Destacada",
      tags: "Etiquetas",
      category: "Categoría",
      saveDraft: "Guardar Borrador",
      publish: "Publicar",
      published: "Publicado",
      draft: "Borrador",
      author: "Autor",
      date: "Fecha",
      edit: "Editar",
      delete: "Eliminar",
      
      // Profile
      profile: "Perfil",
      adminUser: "Usuario Administrador",
      
      // Language
      language: "Idioma",
      english: "Inglés",
      spanish: "Español",
      turkish: "Turco", 
      french: "Francés",
      
      // Employees
      employees: "Empleados",
      employeeManagement: "Gestión de Empleados",
      addEmployee: "Agregar Empleado",
      employeeList: "Lista de Empleados",
      position: "Posición",
      department: "Departamento",
      hireDate: "Fecha de Contratación",
      employeeId: "ID de Empleado",
      
      // Recruitment
      recruitment: "Reclutamiento",
      recruitmentManagement: "Gestión de Reclutamiento",
      addCandidate: "Agregar Candidato",
      candidateList: "Lista de Candidatos",
      candidate: "Candidato",
      candidates: "Candidatos",
      applicationStatus: "Estado de Solicitud",
      interviewDate: "Fecha de Entrevista",
      
      // In Country Check
      inCountryCheck: "Verificación en País",
      inCountryCheckById: "Verificación en País por ID",
      individualId: "ID Individual",
      nationality: "Nacionalidad",
      location: "Ubicación",
      checkStatus: "Estado de Verificación",
      active: "Activo",
      inactive: "Inactivo",
      
      // Visa Applications
      visaApplications: "Solicitudes de Visa",
      businessVisas: "Visas de Negocios",
      studentVisas: "Visas de Estudiante",
      touristVisas: "Visas de Turista",
      businessVisaApplications: "Solicitudes de Visa de Negocios",
      studentVisaApplications: "Solicitudes de Visa de Estudiante",
      touristVisaApplications: "Solicitudes de Visa de Turista",
      
      // Contacts
      contacts: "Contactos",
      contactManagement: "Gestión de Contactos",
      addContact: "Agregar Contacto",
      contactList: "Lista de Contactos",
      phone: "Teléfono",
      
      // Common actions
      filterByName: "Filtrar por Nombre",
      filterById: "Filtrar por ID",
      noDataFound: "No se encontraron datos",
      loading: "Cargando...",
      save: "Guardar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      close: "Cerrar"
    }
  },
  tr: {
    translation: {
      // Navigation
      dashboard: "Kontrol Paneli",
      visaInfo: "Vize Bilgileri",
      articles: "Makaleler",
      settings: "Ayarlar", 
      logout: "Çıkış Yap",
      
      // Auth
      login: "Giriş Yap",
      signup: "Kayıt Ol",
      email: "E-posta",
      password: "Şifre",
      confirmPassword: "Şifreyi Onayla",
      name: "İsim",
      role: "Rol",
      forgotPassword: "Şifrenizi mi unuttunuz?",
      dontHaveAccount: "Hesabınız yok mu?",
      alreadyHaveAccount: "Zaten hesabınız var mı?",
      signIn: "Giriş Yap",
      createAccount: "Hesap Oluştur",
      
      // Dashboard
      welcomeMessage: "Büyükelçilik Yönetim Paneline Hoş Geldiniz",
      totalApplications: "Toplam Başvuru",
      pendingReview: "İnceleme Bekliyor",
      approved: "Onaylandı",
      rejected: "Reddedildi",
      recentApplications: "Son Vize Başvuruları",
      
      // Visa Info
      applicantName: "Başvuran Adı",
      passportNumber: "Pasaport Numarası",
      visaType: "Vize Türü",
      status: "Durum",
      submissionDate: "Başvuru Tarihi",
      searchPlaceholder: "Ara...",
      filterByStatus: "Duruma Göre Filtrele",
      allStatuses: "Tüm Durumlar",
      pending: "Beklemede",
      approvedStatus: "Onaylandı",
      rejectedStatus: "Reddedildi",
      actions: "İşlemler",
      view: "Görüntüle",
      
      // Articles
      articleManagement: "Makale Yönetimi",
      addNewArticle: "Yeni Makale Ekle",
      title: "Başlık",
      content: "İçerik",
      featuredImage: "Öne Çıkan Görsel",
      tags: "Etiketler",
      category: "Kategori",
      saveDraft: "Taslak Kaydet",
      publish: "Yayınla",
      published: "Yayınlandı",
      draft: "Taslak",
      author: "Yazar",
      date: "Tarih",
      edit: "Düzenle",
      delete: "Sil",
      
      // Profile
      profile: "Profil",
      adminUser: "Yönetici Kullanıcı",
      
      // Language
      language: "Dil",
      english: "İngilizce",
      spanish: "İspanyolca",
      turkish: "Türkçe",
      french: "Fransızca",
      
      // Employees
      employees: "Çalışanlar",
      employeeManagement: "Çalışan Yönetimi",
      addEmployee: "Çalışan Ekle",
      employeeList: "Çalışan Listesi",
      position: "Pozisyon",
      department: "Departman",
      hireDate: "İşe Alım Tarihi",
      employeeId: "Çalışan ID",
      
      // Recruitment
      recruitment: "İşe Alım",
      recruitmentManagement: "İşe Alım Yönetimi",
      addCandidate: "Aday Ekle",
      candidateList: "Aday Listesi",
      candidate: "Aday",
      candidates: "Adaylar",
      applicationStatus: "Başvuru Durumu",
      interviewDate: "Mülakat Tarihi",
      
      // In Country Check
      inCountryCheck: "Ülke İçi Kontrol",
      inCountryCheckById: "ID ile Ülke İçi Kontrol",
      individualId: "Kişi ID",
      nationality: "Uyruk",
      location: "Konum",
      checkStatus: "Kontrol Durumu",
      active: "Aktif",
      inactive: "Pasif",
      
      // Visa Applications
      visaApplications: "Vize Başvuruları",
      businessVisas: "İş Vizeleri",
      studentVisas: "Öğrenci Vizeleri",
      touristVisas: "Turist Vizeleri",
      businessVisaApplications: "İş Vizesi Başvuruları",
      studentVisaApplications: "Öğrenci Vizesi Başvuruları",
      touristVisaApplications: "Turist Vizesi Başvuruları",
      
      // Contacts
      contacts: "Kişiler",
      contactManagement: "Kişi Yönetimi",
      addContact: "Kişi Ekle",
      contactList: "Kişi Listesi",
      phone: "Telefon",
      
      // Common actions
      filterByName: "İsme Göre Filtrele",
      filterById: "ID'ye Göre Filtrele",
      noDataFound: "Veri bulunamadı",
      loading: "Yükleniyor...",
      save: "Kaydet",
      cancel: "İptal",
      confirm: "Onayla",
      close: "Kapat"
    }
  },
  fr: {
    translation: {
      // Navigation
      dashboard: "Tableau de Bord",
      visaInfo: "Informations Visa",
      articles: "Articles",
      settings: "Paramètres",
      logout: "Déconnexion",
      
      // Auth
      login: "Connexion",
      signup: "S'inscrire",
      email: "Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      name: "Nom",
      role: "Rôle",
      forgotPassword: "Mot de passe oublié ?",
      dontHaveAccount: "Vous n'avez pas de compte ?",
      alreadyHaveAccount: "Vous avez déjà un compte ?",
      signIn: "Se connecter",
      createAccount: "Créer un compte",
      
      // Dashboard
      welcomeMessage: "Bienvenue dans le Panneau d'Administration de l'Ambassade",
      totalApplications: "Total des Demandes",
      pendingReview: "En attente d'examen",
      approved: "Approuvé",
      rejected: "Rejeté",
      recentApplications: "Demandes de Visa Récentes",
      
      // Visa Info
      applicantName: "Nom du Demandeur",
      passportNumber: "Numéro de Passeport",
      visaType: "Type de Visa",
      status: "Statut",
      submissionDate: "Date de Soumission",
      searchPlaceholder: "Rechercher...",
      filterByStatus: "Filtrer par Statut",
      allStatuses: "Tous les Statuts",
      pending: "En attente",
      approvedStatus: "Approuvé",
      rejectedStatus: "Rejeté",
      actions: "Actions",
      view: "Voir",
      
      // Articles
      articleManagement: "Gestion des Articles",
      addNewArticle: "Ajouter un Nouvel Article",
      title: "Titre",
      content: "Contenu",
      featuredImage: "Image Mise en Avant",
      tags: "Étiquettes",
      category: "Catégorie",
      saveDraft: "Sauvegarder le Brouillon",
      publish: "Publier",
      published: "Publié",
      draft: "Brouillon",
      author: "Auteur",
      date: "Date",
      edit: "Modifier",
      delete: "Supprimer",
      
      // Profile
      profile: "Profil",
      adminUser: "Utilisateur Admin",
      
      // Language
      language: "Langue",
      english: "Anglais",
      spanish: "Espagnol",
      turkish: "Turc",
      french: "Français",
      
      // Employees
      employees: "Employés",
      employeeManagement: "Gestion des Employés",
      addEmployee: "Ajouter Employé",
      employeeList: "Liste des Employés",
      position: "Poste",
      department: "Département",
      hireDate: "Date d'Embauche",
      employeeId: "ID Employé",
      
      // Recruitment
      recruitment: "Recrutement",
      recruitmentManagement: "Gestion du Recrutement",
      addCandidate: "Ajouter Candidat",
      candidateList: "Liste des Candidats",
      candidate: "Candidat",
      candidates: "Candidats",
      applicationStatus: "Statut de Candidature",
      interviewDate: "Date d'Entretien",
      
      // In Country Check
      inCountryCheck: "Vérification dans le Pays",
      inCountryCheckById: "Vérification dans le Pays par ID",
      individualId: "ID Individuel",
      nationality: "Nationalité",
      location: "Emplacement",
      checkStatus: "Statut de Vérification",
      active: "Actif",
      inactive: "Inactif",
      
      // Visa Applications
      visaApplications: "Demandes de Visa",
      businessVisas: "Visas d'Affaires",
      studentVisas: "Visas Étudiants",
      touristVisas: "Visas Touristiques",
      businessVisaApplications: "Demandes de Visa d'Affaires",
      studentVisaApplications: "Demandes de Visa Étudiant",
      touristVisaApplications: "Demandes de Visa Touristique",
      
      // Contacts
      contacts: "Contacts",
      contactManagement: "Gestion des Contacts",
      addContact: "Ajouter Contact",
      contactList: "Liste des Contacts",
      phone: "Téléphone",
      
      // Common actions
      filterByName: "Filtrer par Nom",
      filterById: "Filtrer par ID",
      noDataFound: "Aucune donnée trouvée",
      loading: "Chargement...",
      save: "Sauvegarder",
      cancel: "Annuler",
      confirm: "Confirmer",
      close: "Fermer"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;