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
      french: "French"
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
      french: "Francés"
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
      french: "Fransızca"
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
      french: "Français"
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