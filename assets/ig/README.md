# Instagram fotolari

Bu qovluq `sumqayit_genclerevi` Instagram hesabindan goturulen rəsmi fotolar üçündür.

Instagram anonim girişə icazə vermədiyi üçün (401 + login divarı) fotolar birbaşa çəkilə bilmədi.
İstifadəçi fotoları göndərən kimi bu adlarla bura yerləşdir:

- bina.jpg       - Gənclər Evinin binası (xarici görünüş)
- bina-ic.jpg    - Bina girişi / daxili məkan
- telim-1.jpg   - Təlim / seminar
- telim-2.jpg   - Komanda işi
- robot.jpg     - Robotexnika məşğələsi
- debat.jpg     - Debat / müzakirə
- konullu-1.jpg - Könüllü fəaliyyəti
- tedbir-1.jpg  - Tədbir / icma
- tedbir-2.jpg  - Mədəni fəaliyyət

Sayt avtomatik olaraq `assets/ig/` fotolarını əsas götürür, tapılmadıqda Unsplash yer tutucuya keçir
(`onerror` fallback). Foto əlavə olunduqdan sonra commit + push kifayətdir.
