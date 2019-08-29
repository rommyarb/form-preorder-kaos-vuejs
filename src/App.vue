<template lang="html">
<div is="sui-container" class="app-container">
  <sui-segment>
    <sui-form>
      <sui-form-field>
        <label>Nama</label>
        <input placeholder="Nama Anda" v-model="nama">
      </sui-form-field>

      <sui-form-field>
        <label>Jumlah</label>
        <sui-button-group icons>
          <sui-button icon="minus" @click="decreaseJumlah" />
          <sui-button disabled style="background-color:lightgrey"><span style="color:green">{{jumlah}}</span></sui-button>
          <sui-button icon="plus" @click="increaseJumlah" />
        </sui-button-group>
      </sui-form-field>

      <sui-accordion is="sui-menu" :active-index="1" vertical exclusive styled>
        <sui-accordion-title is="sui-menu-header" active>
          <sui-icon name="dropdown" />
          Ukuran Kaos
        </sui-accordion-title>
        <sui-accordion-content>
          <sui-form>
            <sui-form-field>
              <sui-checkbox radio v-model="ukuran_kaos" label="M" value="M" />
            </sui-form-field>
            <sui-form-field>
              <sui-checkbox radio v-model="ukuran_kaos" label="L" value="L" />
            </sui-form-field>
            <sui-form-field>
              <sui-checkbox radio v-model="ukuran_kaos" label="XL" value="XL" />
            </sui-form-field>
          </sui-form>
        </sui-accordion-content>
      </sui-accordion>

      <sui-form-field>
        <label>Alamat Pengiriman</label>
        <sui-dropdown
          fluid
          selection
          placeholder="Pilih Provinsi"
          :options="provinsi_"
          v-model="alamat.provinsi"
        />
      </sui-form-field>

      <sui-form-field>
        <sui-checkbox label="I agree to the Terms and Conditions" />
      </sui-form-field>
      <sui-button type="submit">Submit</sui-button>
    </sui-form>
  </sui-segment>
</div>
</template>

<script>
import Axios from "axios";
const BASE_URL = "https://fast-training-center.firebaseapp.com";
const allowed_provinces = ["Dki Jakarta", "Banten", "Jawa Barat"];
export default {
  name: "FormExample",
  data() {
    return {
      wilayahIndonesia: null,
      provinsi_: [],
      kota_: [],

      nama: "",
      jumlah: 1,
      ukuran_kaos: null,
      alamat: {
        provinsi: null,
        kota: "",
        detail: ""
      }
    };
  },
  mounted() {
    // load wilayah indonesia
    Axios.post(BASE_URL + "/wilayah-indonesia").then(r => {
      const wilayahIndonesia = r.data;
      for (var key in wilayahIndonesia) {
        const namaProvinsi = Object.keys(wilayahIndonesia[key])[0];
        if (allowed_provinces.includes(namaProvinsi)) {
          this.provinsi_.push({
            text: namaProvinsi,
            value: `${key},${namaProvinsi}`
          });
        }
      }
      this.wilayahIndonesia = wilayahIndonesia;
    });
  },
  watch: {
    "alamat.provinsi": function(value) {
      const split = value.split("")
      const key = value.split("")
      const namaProvinsi = value.split(",")[1];
      this.wilayahIndonesia[key][this.value]
    }
  },
  methods: {
    decreaseJumlah(e) {
      if (this.jumlah > 1) {
        this.jumlah--;
      }
      e.preventDefault();
    },
    increaseJumlah(e) {
      this.jumlah++;
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
.app-container {
  width: 400px !important;
  padding-top: 30px;
}
</style>
