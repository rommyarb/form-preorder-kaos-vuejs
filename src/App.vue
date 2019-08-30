<template lang="html">
  <div is="sui-container" class="app-container">
    <sui-segment>
      <div style="display:flex;justify-content:center;align-items:center">
        <img src="https://img.icons8.com/ios-filled/50/000000/t-shirt--v2.png" style="height:25px;margin-top:25px;">
        &nbsp;&nbsp;&nbsp;
        <h2 is="sui-header">Pre Order Kaos</h2>
      </div>
      <br /><br />
      <sui-form v-if="!submit_success">
        <sui-form-field>
          <label>Nama</label>
          <input name="namapemesan" placeholder="Nama Anda" v-model="form.nama">
        </sui-form-field>

        <sui-form-field>
          <label>Jumlah</label>
          <sui-button-group icons>
            <sui-button icon="minus" @click="decreaseJumlah" />
            <sui-button disabled style="background-color:lightgrey">
              <span style="color:green">{{form.kaos_.length}}</span>
            </sui-button>
            <sui-button icon="plus" @click="increaseJumlah" />
          </sui-button-group>
        </sui-form-field>

        <b>Ukuran</b>
        <sui-accordion style="margin-top:7px" v-for="kaos in form.kaos_" v-bind:key="kaos.id+''" is="sui-menu"
          :active-index="1" vertical exclusive styled>

          <sui-accordion-title is="sui-menu-header" active>
            <sui-icon name="dropdown" />Kaos {{kaos.id}}
          </sui-accordion-title>

          <sui-accordion-content>
            <sui-form>
              <sui-form-field>
                <sui-checkbox radio :name="kaos.id+''" @change="onCheckUkuranKaos(kaos.id,'M')" label="M" value="M" />
              </sui-form-field>
              <sui-form-field>
                <sui-checkbox radio :name="kaos.id+''" @change="onCheckUkuranKaos(kaos.id,'L')" label="L" value="L" />
              </sui-form-field>
              <sui-form-field>
                <sui-checkbox radio :name="kaos.id+''" @change="onCheckUkuranKaos(kaos.id,'XL')" label="XL"
                  value="XL" />
              </sui-form-field>
            </sui-form>
          </sui-accordion-content>
        </sui-accordion>

        <sui-form-field>
          <label>Nama Penerima</label>
          <input name="nama" placeholder="Nama Penerima" v-model="form.nama_penerima">
        </sui-form-field>

        <sui-form-field>
          <label>No.HP Penerima</label>
          <input name="nohp" placeholder="No.HP Penerima" v-model="form.nohp_penerima" type="number">
        </sui-form-field>

        <sui-form-field>
          <label>Alamat Penerima (Jabodetabek only)</label>

          <sui-dropdown fluid selection placeholder="Provinsi" :options="provinsi_" v-model="alamat.provinsi" />

          <sui-dropdown v-if="alamat.provinsi!==null" fluid selection placeholder="Kota" :options="kota_"
            v-model="alamat.kota" />

          <sui-dropdown v-if="alamat.kota!==null" fluid selection placeholder="Kecamatan" :options="kecamatan_"
            v-model="alamat.kecamatan" />

          <input v-if="alamat.kecamatan!==null" name="kodepos" placeholder="Kode Pos" v-model="form.alamat.kode_pos"
            type="number">

          <textarea v-if="form.alamat.kode_pos.length>4" name="alamat" rows="4"
            placeholder="Detail Alamat (isi dengan nama jalan, nomor rumah, nomor kompleks, nama gedung, lantai atau nomor unit)"
            v-model="form.alamat.detail"></textarea>

        </sui-form-field>

        <br>
        <div style="margin-bottom:10px;">
          <label>Keterangan: Harga <b>Rp 125.000</b>, FREE ONGKIR</label>
        </div>

        <sui-button v-show="!submitting" @click="submit" primary type="button">Submit Pre Order</sui-button>
        <img v-show="submitting" src="https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif" style="height:50px" />
      </sui-form>

      <sui-form v-else>
        <h2 is="sui-header" style="color:green">SUCCESS!</h2>

        <p>Silahkan transfer sebesar {{formatRupiah(125000*this.form.kaos_.length)}}<br>ke rekening Bank Muamalat
          <b>3280010758</b>
          a.n. <b>M. Nanda</b></p>
      </sui-form>
    </sui-segment>
  </div>
</template>

<script>
  import Axios from "axios"
  import {
    db
  } from './db'
  const allowed_provinces = ["DKI JAKARTA", "BANTEN", "JAWA BARAT"]
  export default {
    name: "FormExample",
    data() {
      return {
        token: "",
        provinsi_: [],
        kota_: [],
        kecamatan_: [],

        submitting: false,
        submit_success: false,
        form: {
          nama: "",
          kaos_: [{
            id: 1,
            ukuran: null
          }],

          nama_penerima: "",
          nohp_penerima: "",
          alamat: {
            provinsi: "",
            kota: "",
            kecamatan: "",
            kode_pos: "",
            detail: "",
          }
        },

        alamat: {
          provinsi: null,
          kota: null,
          kecamatan: null
        }
      }
    },
    mounted() {
      // get token
      Axios.get("https://x.rajaapi.com/poe").then(r => {
        const token = r.data.token
        this.token = token
        // get provinsi
        Axios.get("https://x.rajaapi.com/MeP7c5ne" + token + "/m/wilayah/provinsi").then(r => {
          const dataProv = r.data.data
          dataProv.forEach(item => {
            if (allowed_provinces.includes(item.name)) {
              this.provinsi_.push({
                text: item.name,
                value: item.id + ',' + item.name
              })
            }
          })
        })
      })
    },
    watch: {
      "alamat.provinsi": function (value) {
        const split = value.split(",")
        const id = split[0]
        const name = split[1]
        this.form.alamat.provinsi = name
        Axios.get("https://x.rajaapi.com/MeP7c5ne" + this.token + "/m/wilayah/kabupaten?idpropinsi=" + id).then(r => {
          const dataKota = r.data.data
          let kota = []
          dataKota.forEach(item => {
            kota.push({
              text: item.name,
              value: item.id + "," + item.name
            })
          })
          this.kota_ = kota
        })
      },
      'alamat.kota': function (value) {
        const split = value.split(",")
        const id = split[0]
        const name = split[1]
        this.form.alamat.kota = name
        Axios.get("https://x.rajaapi.com/MeP7c5ne" + this.token + "/m/wilayah/kecamatan?idkabupaten=" + id).then(
          r => {
            const data = r.data.data
            let kecamatan = []
            data.forEach(item => {
              kecamatan.push({
                text: item.name,
                value: item.name
              })
            })
            this.kecamatan_ = kecamatan
          })
      },
      'alamat.kecamatan': function (value) {
        this.form.alamat.kecamatan = value
      }
    },
    methods: {
      formatRupiah(angka) {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++)
          if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp ' + rupiah.split('', rupiah.length - 1).reverse().join('');
      },
      onCheckUkuranKaos(id, ukuran) {
        let kaos_ = this.form.kaos_
        kaos_.find(item => item.id === id).ukuran = ukuran
        this.form.kaos_ = kaos_
      },
      submit() {
        this.submitting = true
        db.collection('pre_order_kaos').add(this.form).then(() => {
          this.submit_success = true
          window.onbeforeunload = function () {
            return "Keluar?";
          };
        }).catch(e => {
          console.log("SUBMIT FAILED:", e)
        })
      },
      decreaseJumlah(e) {
        if (this.form.kaos_.length > 1) {
          this.form.kaos_.pop()
        }
        e.preventDefault()
      },
      increaseJumlah(e) {
        this.form.kaos_.push({
          id: this.form.kaos_.length + 1,
          ukuran: null
        })
        e.preventDefault()
      }
    }
  }
</script>

<style>
  body {
    background-color: #454545 !important;
  }

  .app-container {
    width: 400px !important;
    padding-top: 30px;
  }
</style>