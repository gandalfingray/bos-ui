const locales = [
    {
        'Name': '한국어',
        'Value': 'ko'
    },
    {
        'Name': 'English',
        'Value': 'en'
    },
    {
        'Name': '日本語',
        'Value': 'jp'
    }
];
      
     
export default {
    getLocales() {
        return locales;
    },

    getLocale() {
        const locale = sessionStorage.getItem('locale');
        return locale != null ? locale : 'ko';
    },

    setLocale(locale) {
        sessionStorage.setItem('locale', locale);
    },

    formatCurrency(){
        const locale = sessionStorage.getItem('locale');
        
        if(locale === 'ko'){
            return '#,##0 원';
        }
        else if(locale === 'en'){
            return '$ #,##0.';
        }
        else if(locale === 'jp'){
            return '¥ #,##0.';
        }
        else{
            return '#,##0';
        }
    },

    formatDate(){
        const locale = sessionStorage.getItem('locale');
        
        if(locale === 'ko'){
            return 'yyyy-MM-dd HH:mm:SS';
        }
        else if(locale === 'en'){
            return 'MM/dd/yyyy';
        }
        else{
            return 'yyyy-MM-dd';
        }
    }
};