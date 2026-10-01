/* Mərkəzləşdirilmiş institusional məzmun konfiqurasiyası.
   Əməkdaşlar bu faylı redaktə edərək əlaqə, ünvan və sosial şəbəkələri yeniləyə bilər.
   Gələcəkdə CMS/API ilə əvəz olunmağa hazırdır.
*/
const SITE_CONFIG = {
  institution: {
    name: "SUMQAYIT GƏNCLƏR EVİ",
    shortName: "Sumqayıt Gənclər Evi",
    established: "2015",
    establishedNote: "Fəaliyyətə başlama tarixi",
    city: "Sumqayıt, Azərbaycan",
    // Əlaqə məlumatları mərkəzdən redaktə olunur:
    address: "5-ci mikrorayon, Sumqayıt Gənclər Evi, Sumqayıt şəhəri, Azərbaycan",
    phone: "+123 45 678 91 01",
    phoneHref: "tel:+123456789101",
    email: "xxxx@gmail.com",
    hours: "Bazar ertəsi - Cümə: 09:00 - 18:00",
    instagram: "",
    mapEmbedQuery: "Sumqayit Youth House"
  },
  nav: [
    { href: "index.html", label: "Ana səhifə", key: "home" },
    { href: "haqqimizda.html", label: "Haqqımızda", key: "about" },
    { href: "fealiyyet.html", label: "Fəaliyyət", key: "activities" },
    { href: "dernekler.html", label: "Təlimlər və Dərnəklər", key: "clubs" },
    { href: "tedbirler.html", label: "Tədbirlər", key: "events" },
    { href: "xeberler.html", label: "Xəbərlər", key: "news" },
    { href: "konulluluk.html", label: "Könüllülük", key: "volunteer" },
    { href: "media.html", label: "Media", key: "media" },
    { href: "elaqe.html", label: "Əlaqə", key: "contact" }
  ]
};

const I18N = {
  az: {
    register: "Qeydiyyat",
    viewActivities: "Fəaliyyətlərə bax",
    heroTitle: "Gənclərin inkişafı üçün imkanların ünvanı",
    heroSub: "Sumqayıt Gənclər Evi gənclərin təhsili, inkişafı, ictimai fəallığı və asudə vaxtının səmərəli təşkili üçün mühit yaradan rəsmi gənclər qurumudur."
  },
  en: {
    register: "Registration",
    viewActivities: "View activities",
    heroTitle: "A hub of opportunities for youth development",
    heroSub: "Sumgayit Youth House is an official youth institution creating an environment for education, development, civic participation and meaningful leisure."
  }
};


