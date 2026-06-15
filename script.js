/* ====== VARIABLES ====== */
let basePrice = 0;
let product = "";

/* ====== LIVRAISON MAYSTRO - 58 WILAYAS ====== */
const livraisonMaystro = {
  "Adrar": { bureau: 850, domicile: 1200 }, "Chlef": { bureau: 500, domicile: 800 }, "Laghouat": { bureau: 650, domicile: 900 },
  "Oum El Bouaghi": { bureau: 500, domicile: 850 }, "Batna": { bureau: 500, domicile: 800 }, "Béjaïa": { bureau: 500, domicile: 800 },
  "Biskra": { bureau: 650, domicile: 900 }, "Béchar": { bureau: 750, domicile: 1000 }, "Blida": { bureau: 500, domicile: 650 },
  "Bouira": { bureau: 500, domicile: 700 }, "Tamanrasset": { bureau: 1100, domicile: 1700 }, "Tébessa": { bureau: 500, domicile: 900 },
  "Tlemcen": { bureau: 500, domicile: 850 }, "Tiaret": { bureau: 500, domicile: 850 }, "Tizi Ouzou": { bureau: 500, domicile: 800 },
  "Alger": { bureau: 400, domicile: 500, rapide: 600 }, "Djelfa": { bureau: 650, domicile: 900 }, "Jijel": { bureau: 500, domicile: 850 },
  "Sétif": { bureau: 500, domicile: 800 }, "Saïda": { bureau: null, domicile: 850 }, "Skikda": { bureau: 500, domicile: 800 },
  "Sidi Bel Abbès": { bureau: 500, domicile: 850 }, "Annaba": { bureau: 500, domicile: 850 }, "Guelma": { bureau: 500, domicile: 850 },
  "Constantine": { bureau: 500, domicile: 800 }, "Médéa": { bureau: 500, domicile: 800 }, "Mostaganem": { bureau: 500, domicile: 850 },
  "M’Sila": { bureau: 650, domicile: 900 }, "Mascara": { bureau: 500, domicile: 850 }, "Ouargla": { bureau: 650, domicile: 950 },
  "Oran": { bureau: 500, domicile: 800 }, "El Bayadh": { bureau: null, domicile: 1000 }, "Bordj Bou Arreridj": { bureau: 500, domicile: 800 },
  "Boumerdès": { bureau: 500, domicile: 650 }, "El Tarf": { bureau: null, domicile: 850 }, "Tindouf": { bureau: 1250, domicile: 1700 },
  "Tissemsilt": { bureau: 550, domicile: 850 }, "El Oued": { bureau: 650, domicile: 950 }, "Khenchela": { bureau: null, domicile: 950 },
  "Souk Ahras": { bureau: 500, domicile: 850 }, "Tipaza": { bureau: 500, domicile: 650 }, "Mila": { bureau: 500, domicile: 800 },
  "Aïn Defla": { bureau: 500, domicile: 850 }, "Naâma": { bureau: 650, domicile: 1000 }, "Aïn Témouchent": { bureau: 0, domicile: 850 }, 
  "Ghardaïa": { bureau: 650, domicile: 900 }, "Relizane": { bureau: 500, domicile: 850 }, "Timimoun": { bureau: null, domicile: 1200 },
  "Ouled Djellal": { bureau: null, domicile: 950 }, "Béni Abbès": { bureau: null, domicile: 1100 }, "In Salah": { bureau: null, domicile: 1500 },
  "Touggourt": { bureau: null, domicile: 950 }, "El M'Ghair": { bureau: null, domicile: 950 }, "El Meniaa": { bureau: null, domicile: 1000 }
};

const wilayas = [
"Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar",
"Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger",
"Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma",
"Constantine","Médéa","Mostaganem","M’Sila","Mascara","Ouargla","Oran","El Bayadh",
"Illizi","Bordj Bou Arreridj","Boumerdès","El Tarf","Tindouf","Tissemsilt",
"El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Aïn Defla","Naâma",
"Aïn Témouchent","Ghardaïa","Relizane","Timimoun","Ouled Djellal","Béni Abbès","In Salah","Touggourt","El M'Ghair","El Meniaa"
];

const wilayaSelect = document.getElementById("wilaya");
const deliverySelect = document.getElementById("delivery");
const deliveryContainer = document.getElementById("deliveryContainer");

if (wilayaSelect) {
    wilayas.forEach((w, index) => {
      const opt = document.createElement("option");
      opt.value = w;
      opt.textContent = `${index + 1} - ${w}`;
      wilayaSelect.appendChild(opt);
    });

    wilayaSelect.addEventListener("change", () => {
      const w = wilayaSelect.value;
      if (!w) {
        deliveryContainer.style.display = "none";
        calc();
        return;
      }

      const prix = livraisonMaystro[w] || { bureau: null, domicile: 1200 };
      let options = "";
      deliveryContainer.style.display = "block";

      if (prix.bureau !== null && prix.bureau !== 0 && prix.bureau !== undefined) {
        options += `<option value="${prix.bureau}">Point de relais / مكتب (${prix.bureau} DA)</option>`;
      } else {
        options += `<option disabled>Point de relais (Non disponible)</option>`;
      }

      if (prix.domicile !== null && prix.domicile !== undefined) {
        options += `<option value="${prix.domicile}">À Domicile / منزل (${prix.domicile} DA)</option>`;
      }

      if (prix.rapide !== null && prix.rapide !== undefined) {
        options += `<option value="${prix.rapide}">Livraison Rapide (Express) / توصيل سريع (${prix.rapide} DA)</option>`;
      }

      deliverySelect.innerHTML = options;
      if ((prix.bureau === null || prix.bureau === 0 || prix.bureau === undefined) && prix.domicile !== null) {
        deliverySelect.value = prix.domicile;
      }
      calc();
    });
}

function filterGender(gender, btnElement) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    if(!product.hasAttribute('data-gender')) return; 

    const productGender = product.getAttribute('data-gender');
    let show = false;
    if (gender === 'all' || gender === productGender) { show = true; }

    if (show) {
      product.style.display = 'flex';
      setTimeout(() => { product.style.opacity = '1'; product.style.transform = 'scale(1)'; }, 50);
    } else {
      product.style.opacity = '0'; 
      product.style.transform = 'scale(0.8)';
      setTimeout(() => { product.style.display = 'none'; }, 300);
    }
  });

  const chocoTitle = document.getElementById('chocoTitle');
  const chocoDesc = document.getElementById('chocoDesc');
  if (gender === 'all' || gender === 'chocolat') {
     if(chocoTitle) chocoTitle.style.display = 'block';
     if(chocoDesc) chocoDesc.style.display = 'block';
  } else {
     if(chocoTitle) chocoTitle.style.display = 'none';
     if(chocoDesc) chocoDesc.style.display = 'none';
  }

  document.getElementById("orderForm").style.display = "none";
}

function slideImage(btn, direction) {
  const wrapper = btn.parentElement;
  const slider = wrapper.querySelector('.image-slider');
  const scrollAmount = slider.clientWidth;
  slider.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
}

function openCustomForm(p, inputId, minPrice) {
  const inputEl = document.getElementById(inputId);
  let customPrice = parseInt(inputEl.value) || minPrice;
  if(customPrice < minPrice) {
    alert(`عذراً، الميزانية لهذا الموديل لا يمكن أن تكون أقل من ${minPrice} دج !`);
    inputEl.value = minPrice;
    customPrice = minPrice;
  }
  openForm(p + " - ميزانية مخصصة", customPrice);
}

function openForm(p, price){
  product = p;
  basePrice = price;
  document.getElementById("productTitle").innerText = "الطلبية : " + p;
  const formElement = document.getElementById("orderForm");
  formElement.style.display = "block";
  calc();
  setTimeout(() => { formElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
}

function calc(){
  const qtyInput = document.getElementById("qty");
  const deliveryInput = document.getElementById("delivery");
  const totalDisplay = document.getElementById("total");

  if (!qtyInput || !deliveryInput || !totalDisplay) return;

  let q = parseInt(qtyInput.value) || 1;
  if (q < 1) { q = 1; qtyInput.value = 1; }
  const d = parseInt(deliveryInput.value) || 0; 
  const totalFinal = (basePrice * q) + d;
  totalDisplay.innerText = "Total: " + totalFinal + " DA";
}

const qtyEl = document.getElementById("qty");
if (qtyEl) qtyEl.addEventListener("input", calc);

const deliveryEl = document.getElementById("delivery");
if (deliveryEl) deliveryEl.addEventListener("change", calc);

function checkFormAndPay(){
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const wilaya = document.getElementById("wilaya").value;
  const commune = document.getElementById("commune").value.trim();
  const qty = document.getElementById("qty").value;

  if(!name || !phone || !wilaya || !commune || qty < 1){
    alert("Veuillez remplir جميع المعلومات من فضلك !");
    return;
  }

  const modal = document.getElementById("paymentModal");
  modal.classList.add("show");
}

function closeModal(){
  const modal = document.getElementById("paymentModal");
  modal.classList.remove("show");
}

function processOrder(paymentChoice){
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const wilaya = document.getElementById("wilaya").value;
  const commune = document.getElementById("commune").value.trim();
  const qty = document.getElementById("qty").value;
  const deliveryType = document.getElementById("delivery").options[document.getElementById("delivery").selectedIndex]?.text || "Non précisé";

  const text = `🌟 *Nouvelle Commande* 🌟
-------------------------
🛍️ *Produit :* ${product}
👤 *Nom :* ${name}
📞 *Tél :* ${phone}
📍 *Wilaya :* ${wilaya}
🏠 *Commune :* ${commune}
📦 *Quantité :* ${qty}
🚚 *Livraison :* ${deliveryType}
💳 *Paiement :* ${paymentChoice}
-------------------------
💰 *${document.getElementById("total").innerText}*`;

  closeModal();
  const url = "https://wa.me/213792822978?text=" + encodeURIComponent(text);
  window.open(url, '_blank');
}

/* ====== جلب المنتجات أوتوماتيكياً من لوحة التحكم ====== */
async function loadCMSProducts() {
  try {
    const response = await fetch('https://api.github.com/repos/cosmetiqueparisien/cosmetiqueparisienne/contents/data/produits');
    if (!response.ok) return; 
    
    const files = await response.json();
    const productList = document.getElementById('productList'); 
    if (!productList) return;

    for (const file of files) {
      if (file.name.endsWith('.json')) {
        const res = await fetch(file.download_url);
        const productData = await res.json();
        
        let imagePath = productData.image || "";
        if(imagePath.startsWith('/')) {
            imagePath = '.' + imagePath;
        }

        const productHTML = `
          <div class="product" data-gender="${productData.gender}">
            <img src="${imagePath}" alt="${productData.title}" loading="lazy">
            <h3>${productData.title}</h3>
            <p class="price">${productData.price} DA</p>
            <button onclick="openForm('${productData.title}', ${productData.price})">تقديم الطلبية</button>
          </div>
        `;
        
        productList.insertAdjacentHTML('beforeend', productHTML); 
      }
    }
  } catch (error) {
    console.log("Erreur chargement CMS:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadCMSProducts);
