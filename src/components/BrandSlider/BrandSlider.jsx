import { useEffect } from 'react';
import './BrandSlider.css';

const BrandSlider = () => {

    useEffect(() => {
        const original = document.querySelector(".logos-slide");
        const slider = document.querySelector(".logo-slider");

        if (original && slider && slider.children.length < 2) {
            const copy = original.cloneNode(true);
            slider.appendChild(copy);
        }
    }, []);

    const arrayNameBrands = [
        "patrocinadores/artesanias_luyma.png",
        "patrocinadores/ascensores_sevilla.png",
        "patrocinadores/asesor_movil.png",
        "patrocinadores/asesoria_robles.png",
        "patrocinadores/burgo_nuevo_a_enviar.png",
        "patrocinadores/burguer_copos.png",
        "patrocinadores/cafe_bar_00.png",
        "patrocinadores/cafe_oficina.png",
        "patrocinadores/campamento_balonmano.png",
        "patrocinadores/casa_del_pueblo_sariegos.png",
        "patrocinadores/caspio.png",
        "patrocinadores/churreria_santa_ana.png",
        "patrocinadores/cielito_mio.png",
        "patrocinadores/coesa.png",
        "patrocinadores/comercial_silva.png",
        "patrocinadores/diputacion_de_leon.png",
        "patrocinadores/dos_hermanas.png",
        "patrocinadores/dytur.png",
        "patrocinadores/el_pajaro.png",
        "patrocinadores/farmacia_azadinos.png",
        "patrocinadores/ferecor_bar.png",
        "patrocinadores/ferreteria_el_crucero.png",
        "patrocinadores/fisiopat.png",
        "patrocinadores/horno_san_francisco.png",
        "patrocinadores/hotel_alfageme.png",
        "patrocinadores/huevos_leon.png",
        "patrocinadores/ikusa.png",
        "patrocinadores/ileon.png",
        "patrocinadores/instituto_oftalmológico_colon.png",
        "patrocinadores/juniors.png",
        "patrocinadores/la_tiendina.png",
        "patrocinadores/larry.png",
        "patrocinadores/logo-ifs_color.png",
        "patrocinadores/lona_abanico_formativo.png",
        "patrocinadores/lona_viuda.png",
        "patrocinadores/moloko.png",
        "patrocinadores/niquelao.png",
        "patrocinadores/oh_my_cut.png",
        "patrocinadores/omar_principe_gas.png",
        "patrocinadores/orto_3.png",
        "patrocinadores/pantoja.png",
        "patrocinadores/pelaez.png",
        "patrocinadores/picaraza.png",
        "patrocinadores/pmc_ingenieros.png",
        "patrocinadores/psicologia_elena_ordoñez.png",
        "patrocinadores/residencia_los_rosales.png",
        "patrocinadores/silva_cideo.png",
        "patrocinadores/leclerc.png",
        "patrocinadores/pupitres_bueno.png"
    ]

    return (
        <div className="logo-slider">
            <div className="logos-slide">
                {arrayNameBrands.map((brand, index) => (
                    <a key={index} className='logoLink'>
                        <img src={brand} alt="Brand logo" />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default BrandSlider;
