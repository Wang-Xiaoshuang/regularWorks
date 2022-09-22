import { router } from 'umi';
import styles from './index.less';
import logo from '@/assets/logoT.png';
import logoU from '@/assets/logoU.png';

export default () => {
  return (
    <div
      className={styles.pngWrap}
      style={{
        cursor: 'pointer',
      }}
      onClick={() => router.push('/')}
    >
      <img
        src={logo}
        alt=""
        style={{
          width: '46%',
          top: '4%',
          left: '4%',
          zIndex: 2,
        }}
      />
      <img
        src={logoU}
        alt=""
        style={{
          width: '60%',
          top: 0,
          right: 0,
        }}
      />
      <svg
        style={{ zIndex: 1 }}
        height="100%"
        viewBox="0 0 842 768"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsSlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient x1="79.5924573%" y1="85.7432002%" x2="50%" y2="50%" id="linearGradient-1">
            <stop stopColor="#31C1E4" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="#90F6FF" offset="100%"></stop>
          </linearGradient>
          <linearGradient x1="79.5924573%" y1="75.5194268%" x2="50%" y2="50%" id="linearGradient-2">
            <stop stopColor="#31C1E4" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="#90F6FF" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="59.4447069%"
            y1="16.0321482%"
            x2="50%"
            y2="84.4323644%"
            id="linearGradient-3"
          >
            <stop stopColor="#31C1E4" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="#90F6FF" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="57.9513686%"
            y1="2.80937296%"
            x2="50%"
            y2="97.8359619%"
            id="linearGradient-4"
          >
            <stop stopColor="#31C1E4" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="#90F6FF" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="82.8906246%"
            y1="0%"
            x2="22.1923482%"
            y2="110.357742%"
            id="linearGradient-5"
          >
            <stop stopColor="#9FECFF" offset="0%"></stop>
            <stop stopColor="#20BCE3" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="61.1249555%"
            y1="0%"
            x2="40.594314%"
            y2="110.357742%"
            id="linearGradient-6"
          >
            <stop stopColor="#D1F6FF" offset="0%"></stop>
            <stop stopColor="#5DD6F4" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="71.2602863%"
            y1="0%"
            x2="32.0253143%"
            y2="110.357742%"
            id="linearGradient-7"
          >
            <stop stopColor="#FAFEFF" offset="0%"></stop>
            <stop stopColor="#C2F3FF" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="100%"
            y1="30.6443193%"
            x2="7.72708464%"
            y2="73.3653037%"
            id="linearGradient-8"
          >
            <stop stopColor="#FAFEFF" offset="0%"></stop>
            <stop stopColor="#C2F3FF" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="76.710522%"
            y1="0%"
            x2="27.4173673%"
            y2="110.357742%"
            id="linearGradient-9"
          >
            <stop stopColor="#149BBC" offset="0%"></stop>
            <stop stopColor="#0385A5" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="78.8343038%"
            y1="0%"
            x2="25.6217983%"
            y2="110.357742%"
            id="linearGradient-10"
          >
            <stop stopColor="#9FECFF" offset="0%"></stop>
            <stop stopColor="#20BCE3" offset="100%"></stop>
          </linearGradient>
          <polygon
            id="path-11"
            points="0.874021266 113.699692 0 266 202 149.913119 202 0"
          ></polygon>
          <linearGradient
            x1="41.2082511%"
            y1="3.07391435%"
            x2="57.9862348%"
            y2="95.6829499%"
            id="linearGradient-13"
          >
            <stop stopColor="#FFDCDC" offset="0%"></stop>
            <stop stopColor="#F4A093" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="100%"
            y1="9.92717129%"
            x2="7.72708464%"
            y2="98.3741093%"
            id="linearGradient-14"
          >
            <stop stopColor="#FFFFFF" offset="0%"></stop>
            <stop stopColor="#FFF3F2" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="101.860566%"
            y1="41.0581288%"
            x2="25.2369466%"
            y2="62.557962%"
            id="linearGradient-15"
          >
            <stop stopColor="#1194B4" offset="0%"></stop>
            <stop stopColor="#0F95B5" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="100%"
            y1="32.0926881%"
            x2="7.72708464%"
            y2="71.6168983%"
            id="linearGradient-16"
          >
            <stop stopColor="#D1F6FF" offset="0%"></stop>
            <stop stopColor="#5DD6F4" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="100%"
            y1="32.7942598%"
            x2="4.3510324%"
            y2="69.3767204%"
            id="linearGradient-17"
          >
            <stop stopColor="#8DE9FF" offset="0%"></stop>
            <stop stopColor="#32B0CF" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="211.463864%"
            y1="5.24873414%"
            x2="4.3510324%"
            y2="65.3736747%"
            id="linearGradient-18"
          >
            <stop stopColor="#116478" offset="0%"></stop>
            <stop stopColor="#22AACB" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="83.3962553%"
            y1="36.4077618%"
            x2="6.98584161%"
            y2="94.9198578%"
            id="linearGradient-19"
          >
            <stop stopColor="#D1F6FF" offset="0%"></stop>
            <stop stopColor="#5DD6F4" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="77.1187269%"
            y1="87.3413654%"
            x2="22.421875%"
            y2="21.2427843%"
            id="linearGradient-20"
          >
            <stop stopColor="#76D4EB" offset="0%"></stop>
            <stop stopColor="#3FB1CC" offset="28.2492947%"></stop>
            <stop stopColor="#99EBFF" offset="46.5226107%"></stop>
            <stop stopColor="#9DE8FB" offset="80.907916%"></stop>
            <stop stopColor="#30B1D1" offset="100%"></stop>
          </linearGradient>
          <path
            d="M0,53.2009169 L94.4488301,0 L117.94612,12.881054 C128.833876,18.8496475 135.602257,30.2786991 135.602257,42.6951132 L135.602257,126.248914 C135.602257,136.190039 143.661131,144.248914 153.602257,144.248914 C156.335845,144.248914 159.033527,143.626308 161.490631,142.428332 L179.241796,133.773643 C185.182391,130.877269 192.139889,130.946481 198.02169,133.96046 L240,155.471181 L145.875309,208.72785 L118.432617,194.334677 C109.322444,189.556563 98.2153935,190.846768 90.4430815,197.585964 L79.1412401,207.385537 C75.9494923,210.15303 71.3629559,210.616295 67.6822571,208.542958 L50.494403,198.861043 C43.888223,195.139783 39.8010041,188.146389 39.8010041,180.564213 L39.8010041,95.8507712 C39.8010041,83.7200247 33.3378579,72.5081772 22.8404643,66.4287251 L0,53.2009169 Z"
            id="path-21"
          ></path>
          <linearGradient
            x1="18.0903158%"
            y1="65.8085312%"
            x2="78.1153895%"
            y2="46.5657556%"
            id="linearGradient-22"
          >
            <stop stopColor="#80959F" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="#0E899F" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="18.0903158%"
            y1="65.7771651%"
            x2="78.1153895%"
            y2="46.5725695%"
            id="linearGradient-23"
          >
            <stop stopColor="#80959F" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="#0E899F" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="36.7387036%"
            y1="95.5644223%"
            x2="54.6253511%"
            y2="50%"
            id="linearGradient-24"
          >
            <stop stopColor="#31C1E4" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="#90F6FF" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="36.7387036%"
            y1="78.8994045%"
            x2="54.6253511%"
            y2="50%"
            id="linearGradient-25"
          >
            <stop stopColor="#31C1E4" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="#90F6FF" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="50.7206116%"
            y1="4.54216344%"
            x2="49.3483064%"
            y2="94.9108109%"
            id="linearGradient-26"
          >
            <stop stopColor="#EEBF5C" offset="0%"></stop>
            <stop stopColor="#D7994B" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="51.4979563%"
            y1="4.54216344%"
            x2="48.6453054%"
            y2="94.9108109%"
            id="linearGradient-27"
          >
            <stop stopColor="#FED47B" offset="0%"></stop>
            <stop stopColor="#DCA867" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="78.2992176%"
            y1="35.3565333%"
            x2="-148.636682%"
            y2="114.991632%"
            id="linearGradient-28"
          >
            <stop stopColor="#FFDF9C" offset="0%"></stop>
            <stop stopColor="#DCA867" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="50%"
            y1="-30.3799334%"
            x2="47.6794306%"
            y2="86.4508198%"
            id="linearGradient-29"
          >
            <stop stopColor="#19D3CC" offset="0%"></stop>
            <stop stopColor="#0D91A5" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="37.3405093%"
            y1="-8.06074322%"
            x2="45.3920347%"
            y2="86.4508198%"
            id="linearGradient-30"
          >
            <stop stopColor="#23E7DF" offset="0%"></stop>
            <stop stopColor="#0F9FB5" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="76.7858401%"
            y1="33.8933528%"
            x2="-32.4611357%"
            y2="81.3709817%"
            id="linearGradient-31"
          >
            <stop stopColor="#23E7DF" offset="0%"></stop>
            <stop stopColor="#23C1D9" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="52.1914325%"
            y1="-33.3540497%"
            x2="50.4002507%"
            y2="100%"
            id="linearGradient-32"
          >
            <stop stopColor="#FEA6A6" offset="0%"></stop>
            <stop stopColor="#D56553" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="50%"
            y1="100%"
            x2="51.6072929%"
            y2="-24.7271788%"
            id="linearGradient-33"
          >
            <stop stopColor="#1A7CDC" offset="0%"></stop>
            <stop stopColor="#23BFDD" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="50.9836844%"
            y1="4.54216344%"
            x2="49.1103934%"
            y2="94.9108109%"
            id="linearGradient-34"
          >
            <stop stopColor="#FEA6A6" offset="0%"></stop>
            <stop stopColor="#DC7767" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="-62.8885291%"
            y1="89.8078233%"
            x2="100%"
            y2="38.5385373%"
            id="linearGradient-35"
          >
            <stop stopColor="#3299FF" offset="0%"></stop>
            <stop stopColor="#61E6FF" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="100%"
            y1="33.8933528%"
            x2="-53.8367829%"
            y2="70.3087156%"
            id="linearGradient-36"
          >
            <stop stopColor="#FFDCDC" offset="0%"></stop>
            <stop stopColor="#F4A093" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="50%"
            y1="100%"
            x2="50.7839531%"
            y2="-24.7271788%"
            id="linearGradient-37"
          >
            <stop stopColor="#0B69C5" offset="0%"></stop>
            <stop stopColor="#15BBDA" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g id="页面-1" stroke="none" fill="none" fillRule="evenodd">
          <g id="登录">
            <g id="编组-8" transform="translate(10.000000, 0.000000)">
              <g transform="translate(-10.000000, 0.000000)">
                <path
                  d="M355.849624,780.419582 L841.0029,500.984669 L475.093287,287.579398 L0.977081939,566.260491 L355.849624,780.419582 Z"
                  id="路径-124"
                  stroke="#83E3FA"
                  fillOpacity="0.163598121"
                  fill="#FFFFFF"
                  opacity="0.479399182"
                ></path>
                <polygon
                  id="路径-135"
                  fillOpacity="0.3"
                  fill="url(#linearGradient-1)"
                  opacity="0.721354167"
                  points="367.760648 736 765 507.001819 765 785.901039 367.760648 785.901039"
                ></polygon>
                <polygon
                  id="路径-135备份"
                  fillOpacity="0.3"
                  fill="url(#linearGradient-2)"
                  opacity="0.820172991"
                  points="360.736091 778 793 529.46282 793 785.901039 361.700887 785.901039"
                ></polygon>
                <path
                  d="M367.766575,735.419452 L764.00355,506.999116 L465.199921,332.579527 L77.9764545,560.384103 L367.766575,735.419452 Z"
                  id="路径-124"
                  stroke="#83E3FA"
                  fillOpacity="0.163598121"
                  fill="#FFFFFF"
                  opacity="0.421084449"
                ></path>
                <polygon
                  id="路径-124"
                  fill="#129AB5"
                  opacity="0.645438058"
                  points="378.903768 694 693 512.615302 455.947995 374 149 554.893819"
                ></polygon>
                <polygon
                  id="路径-124"
                  fill="#129AB5"
                  opacity="0.87874349"
                  points="379.344467 693 623 553.560514 439.110393 447 201 586.062123"
                ></polygon>
                <path
                  d="M153.433625,558.038285 L12,0 L830,0 L693,519.764103 L692.654987,519.790507 L693,519.984056 L378.903768,694 L149,560.545007 L153.433625,558.038285 Z"
                  id="形状结合"
                  fillOpacity="0.3"
                  fill="url(#linearGradient-3)"
                  opacity="0.858700707"
                ></path>
                <polygon
                  id="路径-137"
                  fillOpacity="0.3"
                  fill="url(#linearGradient-4)"
                  opacity="0.793991815"
                  points="201 590.49938 94.5 7.27595761e-12 730.357702 7.27595761e-12 623 559.346385 378.457678 693"
                ></polygon>
                <g
                  id="编组-7"
                  transform="translate(453.000000, 593.500000) rotate(2.000000) translate(-453.000000, -593.500000) translate(427.000000, 573.000000)"
                  fill="url(#linearGradient-5)"
                >
                  <polygon
                    id="路径-133"
                    opacity="0.578892299"
                    transform="translate(8.271867, 32.500000) rotate(-28.000000) translate(-8.271867, -32.500000) "
                    points="8.15352365 26 3 33.8988574 10.5565532 39 13.5437333 37.6613548 7.27422445 33.0327286 11.0195518 26.295131"
                  ></polygon>
                  <polygon
                    id="路径-133备份"
                    opacity="0.455008371"
                    transform="translate(20.271867, 24.500000) rotate(-28.000000) translate(-20.271867, -24.500000) "
                    points="20.1535236 18 15 25.8988574 22.5565532 31 25.5437333 29.6613548 19.2742245 25.0327286 23.0195518 18.295131"
                  ></polygon>
                  <polygon
                    id="路径-133备份-2"
                    opacity="0.278250558"
                    transform="translate(32.271867, 16.500000) rotate(-28.000000) translate(-32.271867, -16.500000) "
                    points="32.1535236 10 27 17.8988574 34.5565532 23 37.5437333 21.6613548 31.2742245 17.0327286 35.0195518 10.295131"
                  ></polygon>
                  <polygon
                    id="路径-133备份-3"
                    opacity="0.195917039"
                    transform="translate(44.271867, 8.500000) rotate(-28.000000) translate(-44.271867, -8.500000) "
                    points="44.1535236 2 39 9.89885735 46.5565532 15 49.5437333 13.6613548 43.2742245 9.03272855 47.0195518 2.29513099"
                  ></polygon>
                </g>
                <g
                  id="编组-7备份-9"
                  opacity="0.579938616"
                  transform="translate(507.000000, 560.500000) rotate(2.000000) translate(-507.000000, -560.500000) translate(481.000000, 540.000000)"
                  fill="url(#linearGradient-5)"
                >
                  <polygon
                    id="路径-133"
                    opacity="0.389601935"
                    transform="translate(8.271867, 32.500000) rotate(-28.000000) translate(-8.271867, -32.500000) "
                    points="8.15352365 26 3 33.8988574 10.5565532 39 13.5437333 37.6613548 7.27422445 33.0327286 11.0195518 26.295131"
                  ></polygon>
                  <polygon
                    id="路径-133备份"
                    opacity="0.255417597"
                    transform="translate(20.271867, 24.500000) rotate(-28.000000) translate(-20.271867, -24.500000) "
                    points="20.1535236 18 15 25.8988574 22.5565532 31 25.5437333 29.6613548 19.2742245 25.0327286 23.0195518 18.295131"
                  ></polygon>
                  <polygon
                    id="路径-133备份-2"
                    opacity="0.181477865"
                    transform="translate(32.271867, 16.500000) rotate(-28.000000) translate(-32.271867, -16.500000) "
                    points="32.1535236 10 27 17.8988574 34.5565532 23 37.5437333 21.6613548 31.2742245 17.0327286 35.0195518 10.295131"
                  ></polygon>
                  <polygon
                    id="路径-133备份-3"
                    opacity="0.195917039"
                    transform="translate(44.271867, 8.500000) rotate(-28.000000) translate(-44.271867, -8.500000) "
                    points="44.1535236 2 39 9.89885735 46.5565532 15 49.5437333 13.6613548 43.2742245 9.03272855 47.0195518 2.29513099"
                  ></polygon>
                </g>
                <g
                  id="编组-7"
                  transform="translate(370.000000, 600.500000) scale(-1, 1) rotate(4.000000) translate(-370.000000, -600.500000) translate(344.000000, 580.000000)"
                  fill="url(#linearGradient-5)"
                >
                  <polygon
                    id="路径-133"
                    opacity="0.578892299"
                    transform="translate(8.271867, 32.500000) rotate(-28.000000) translate(-8.271867, -32.500000) "
                    points="8.15352365 26 3 33.8988574 10.5565532 39 13.5437333 37.6613548 7.27422445 33.0327286 11.0195518 26.295131"
                  ></polygon>
                  <polygon
                    id="路径-133备份"
                    opacity="0.455008371"
                    transform="translate(20.271867, 24.500000) rotate(-28.000000) translate(-20.271867, -24.500000) "
                    points="20.1535236 18 15 25.8988574 22.5565532 31 25.5437333 29.6613548 19.2742245 25.0327286 23.0195518 18.295131"
                  ></polygon>
                  <polygon
                    id="路径-133备份-2"
                    opacity="0.278250558"
                    transform="translate(32.271867, 16.500000) rotate(-28.000000) translate(-32.271867, -16.500000) "
                    points="32.1535236 10 27 17.8988574 34.5565532 23 37.5437333 21.6613548 31.2742245 17.0327286 35.0195518 10.295131"
                  ></polygon>
                  <polygon
                    id="路径-133备份-3"
                    opacity="0.195917039"
                    transform="translate(44.271867, 8.500000) rotate(-28.000000) translate(-44.271867, -8.500000) "
                    points="44.1535236 2 39 9.89885735 46.5565532 15 49.5437333 13.6613548 43.2742245 9.03272855 47.0195518 2.29513099"
                  ></polygon>
                </g>
                <polygon
                  id="路径-116"
                  fill="url(#linearGradient-6)"
                  opacity="0.307826451"
                  points="167.698373 194.727931 167.698373 349.76977 267.698373 290.68059 267.698373 137.76977"
                ></polygon>
                <polygon
                  id="路径-116"
                  fill="url(#linearGradient-6)"
                  opacity="0.433291481"
                  points="179.698373 205.727931 179.698373 360.76977 279.698373 301.68059 279.698373 148.76977"
                ></polygon>
                <polygon
                  id="路径-116"
                  fill="url(#linearGradient-6)"
                  points="191.698373 216.727931 191.698373 371.76977 291.698373 312.68059 291.698373 159.76977"
                ></polygon>
                <g id="编组-9" transform="translate(206.698373, 206.947526)">
                  <polygon
                    id="路径-116"
                    fill="url(#linearGradient-7)"
                    points="0 30.6809302 0 73.8222444 44.5209698 48.5398782 44.5209698 5.54671692"
                  ></polygon>
                  <polygon
                    id="路径-116备份-3"
                    fill="url(#linearGradient-8)"
                    points="0 122.335761 0 124.770267 69.1289803 84.0456357 69.1289803 81.7592833"
                  ></polygon>
                  <polygon
                    id="路径-116备份-4"
                    fill="url(#linearGradient-8)"
                    points="0 106.335761 0 108.770267 69.1289803 68.0456357 69.1289803 65.7592833"
                  ></polygon>
                  <polygon
                    id="路径-116备份-5"
                    fill="url(#linearGradient-8)"
                    points="0 89.3357615 0 91.7702667 69.1289803 51.0456357 69.1289803 48.7592833"
                  ></polygon>
                  <polygon
                    id="路径-132"
                    fill="#F3FCFF"
                    fillRule="nonzero"
                    points="69.3039154 7.10542736e-13 69.3039154 2.10881155 48.6270556 14.2667789 48.6270556 12.0173893"
                  ></polygon>
                  <polygon
                    id="路径-132备份"
                    fill="#F3FCFF"
                    fillRule="nonzero"
                    points="69.3039154 14 69.3039154 16.1088116 48.6270556 28.2667789 48.6270556 26.0173893"
                  ></polygon>
                  <polygon
                    id="路径-132备份-2"
                    fill="#F3FCFF"
                    fillRule="nonzero"
                    points="69.3039154 28 69.3039154 30.1088116 48.6270556 42.2667789 48.6270556 40.0173893"
                  ></polygon>
                </g>
                <path
                  d="M271,277.226786 L271,438.226688 C271,440.988112 273.238576,443.226688 276,443.226688 C276.896674,443.226688 277.776848,442.985557 278.548323,442.528554 L485.115974,320.162816 C488.763289,318.002234 491,314.077561 491,309.838337 L491,156.351147 C491,153.037438 488.313708,150.351147 485,150.351147 C483.953779,150.351147 482.925741,150.624714 482.017893,151.144705 L275.526839,269.417124 C272.727115,271.020729 271,274.000332 271,277.226786 Z"
                  id="路径-122"
                  fill="url(#linearGradient-9)"
                ></path>
                <g id="路径-123" transform="translate(281.000000, 164.000000)">
                  <mask id="mask-12" fill="white">
                    <use xlinkHref="#path-11"></use>
                  </mask>
                  <use
                    id="蒙版"
                    fill="url(#linearGradient-10)"
                    opacity="0.77827381"
                    xlinkHref="#path-11"
                  ></use>
                </g>
                <polygon
                  id="路径-120"
                  fill="url(#linearGradient-13)"
                  points="570.654171 199.841331 570.654171 326.321814 641.177705 368.024075 641.177705 241.813576"
                ></polygon>
                <polygon
                  id="路径-120备份"
                  fill="url(#linearGradient-14)"
                  points="583 237.012752 583 250.743919 629.450637 278.59727 629.450637 265.001079"
                ></polygon>
                <polygon
                  id="路径-120备份-2"
                  fill="url(#linearGradient-14)"
                  points="583 264 583 277.731167 629.450637 305.584518 629.450637 291.988326"
                ></polygon>
                <polygon
                  id="路径-120备份-3"
                  fill="url(#linearGradient-14)"
                  points="583 290 583 303.731167 629.450637 331.584518 629.450637 317.988326"
                ></polygon>
                <path
                  d="M425.343859,549.543852 L631.780639,430.277769 C634.410808,428.758224 635.311147,425.394216 633.791602,422.764047 C633.311268,421.932639 632.621644,421.241466 631.791316,420.759268 L499.339668,343.840269 C494.807631,341.208367 489.208085,341.226842 484.693513,343.888593 L280.472795,464.295302 C278.331916,465.557545 277.619641,468.316321 278.881884,470.457201 C279.260845,471.099953 279.793685,471.638386 280.432445,472.024037 L408.561623,549.382034 C413.708448,552.48943 420.138072,552.551426 425.343859,549.543852 Z"
                  id="路径-124"
                  stroke="#8DE9FE"
                ></path>
                <path
                  d="M425.343859,563.543852 L631.780639,444.277769 C634.410808,442.758224 635.311147,439.394216 633.791602,436.764047 C633.311268,435.932639 632.621644,435.241466 631.791316,434.759268 L499.339668,357.840269 C494.807631,355.208367 489.208085,355.226842 484.693513,357.888593 L280.472795,478.295302 C278.331916,479.557545 277.619641,482.316321 278.881884,484.457201 C279.260845,485.099953 279.793685,485.638386 280.432445,486.024037 L408.561623,563.382034 C413.708448,566.48943 420.138072,566.551426 425.343859,563.543852 Z"
                  id="路径-124"
                  stroke="#8DE9FE"
                ></path>
                <path
                  d="M425.593984,530.976792 L632.030765,411.710709 C634.90004,410.053024 635.882228,406.383197 634.224542,403.513921 C633.700541,402.606931 632.948224,401.852925 632.042412,401.32689 L499.590764,324.407891 C494.90245,321.685233 489.109816,321.704346 484.43957,324.457881 L280.218852,444.86459 C277.840097,446.267083 277.04868,449.33239 278.451172,451.711145 C278.87224,452.425313 279.464284,453.023572 280.174018,453.452074 L408.303196,530.810071 C413.605985,534.01163 420.230446,534.075505 425.593984,530.976792 Z"
                  id="路径-124"
                  fill="url(#linearGradient-15)"
                ></path>
                <g
                  id="编组-7备份"
                  transform="translate(367.491350, 411.508802) rotate(-1.000000) translate(-367.491350, -411.508802) translate(302.991350, 373.008802)"
                  fill="#FFFFFF"
                  opacity="0.624906994"
                >
                  <polygon
                    id="路径-41"
                    points="7.17757622 76.9826999 0.0176047113 71.7918731 9.4256846 65.9826999 17.0176047 71.7918731"
                  ></polygon>
                  <polygon
                    id="路径-41备份-3"
                    points="20.1601238 68.9825476 13.0001523 63.7917208 22.4082322 57.9825476 30.0001523 63.7917208"
                  ></polygon>
                  <polygon
                    id="路径-41备份-4"
                    points="33.1599715 62 26 56.8091732 35.4080799 51 43 56.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-5"
                    points="45.1599715 55 38 49.8091732 47.4080799 44 55 49.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-6"
                    points="58.1772716 47.0176047 51.0173001 41.8267779 60.42538 36.0176047 68.0173001 41.8267779"
                  ></polygon>
                  <polygon
                    id="路径-41备份-7"
                    points="70.1599715 40 63 34.8091732 72.4080799 29 80 34.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-8"
                    points="82.1599715 33 75 27.8091732 84.4080799 22 92 27.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-9"
                    points="94.1599715 26 87 20.8091732 96.4080799 15 104 20.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-10"
                    points="107.159972 18 100 12.8091732 109.40808 7 117 12.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-11"
                    points="119.159972 11 112 5.80917322 121.40808 -3.63797881e-12 129 5.80917322"
                  ></polygon>
                </g>
                <g
                  id="编组-7备份-6"
                  transform="translate(429.000000, 335.000000)"
                  fill="#FFFFFF"
                  opacity="0.624906994"
                >
                  <polygon
                    id="路径-41备份-7"
                    points="7.15997151 40 0 34.8091732 9.40807989 29 17 34.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-8"
                    points="19.1599715 33 12 27.8091732 21.4080799 22 29 27.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-9"
                    points="31.1599715 26 24 20.8091732 33.4080799 15 41 20.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-10"
                    points="44.1599715 18 37 12.8091732 46.4080799 7 54 12.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-11"
                    points="56.1599715 11 49 5.80917322 58.4080799 0 66 5.80917322"
                  ></polygon>
                </g>
                <g
                  id="编组-7备份-2"
                  transform="translate(373.884853, 431.696942) rotate(-3.000000) translate(-373.884853, -431.696942) translate(321.384853, 400.696942)"
                  fill="#FFFFFF"
                  opacity="0.624906994"
                >
                  <polygon
                    id="路径-41"
                    points="7.2150484 61.8966986 0.0550768867 56.7058718 9.46315677 50.8966986 17.0550769 56.7058718"
                  ></polygon>
                  <polygon
                    id="路径-41备份-3"
                    points="20.1627124 53.8953281 13.0027409 48.7045013 22.4108208 42.8953281 30.0027409 48.7045013"
                  ></polygon>
                  <polygon
                    id="路径-41备份-4"
                    points="33.161342 46.947664 26.0013705 41.7568373 35.4094504 35.947664 43.0013705 41.7568373"
                  ></polygon>
                  <polygon
                    id="路径-41备份-5"
                    points="46.1599715 40 39 34.8091732 48.4080799 29 56 34.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-6"
                    points="60.1572306 33.1046719 52.9972591 27.9138451 62.405339 22.1046719 69.9972591 27.9138451"
                  ></polygon>
                  <polygon
                    id="路径-41备份-8"
                    points="83.1599715 18 76 12.8091732 85.4080799 7 93 12.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-9"
                    points="95.1599715 11 88 5.80917322 97.4080799 -1.8189894e-11 105 5.80917322"
                  ></polygon>
                </g>
                <g
                  id="编组-7备份-5"
                  transform="translate(450.965710, 386.035509) rotate(-2.000000) translate(-450.965710, -386.035509) translate(385.965710, 349.035509)"
                  fill="#FFFFFF"
                  opacity="0.624906994"
                >
                  <polygon
                    id="路径-41"
                    points="7.26588835 73.9320285 0.105916836 68.7412017 9.51399672 62.9320285 17.1059168 68.7412017"
                  ></polygon>
                  <polygon
                    id="路径-41备份-5"
                    points="46.1599715 54 39 48.8091732 48.4080799 43 56 48.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-6"
                    points="58.1599715 47 51 41.8091732 60.4080799 36 68 41.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-7"
                    points="71.1599715 39 64 33.8091732 73.4080799 28 81 33.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-8"
                    points="83.1599715 32 76 26.8091732 85.4080799 21 93 26.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-9"
                    points="95.1599715 25 88 19.8091732 97.4080799 14 105 19.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-10"
                    points="108.125072 17.9993908 100.965101 12.808564 110.37318 6.99939083 117.965101 12.808564"
                  ></polygon>
                  <polygon
                    id="路径-41备份-11"
                    points="120.125072 10.9993908 112.965101 5.80856404 122.37318 -0.000609172981 129.965101 5.80856404"
                  ></polygon>
                </g>
                <g
                  id="编组-7备份-8"
                  transform="translate(490.965710, 410.035509) rotate(-2.000000) translate(-490.965710, -410.035509) translate(425.965710, 373.035509)"
                  fill="#FFFFFF"
                  opacity="0.624906994"
                >
                  <polygon
                    id="路径-41"
                    points="7.26588835 73.9320285 0.105916836 68.7412017 9.51399672 62.9320285 17.1059168 68.7412017"
                  ></polygon>
                  <polygon
                    id="路径-41备份-5"
                    points="46.1599715 54 39 48.8091732 48.4080799 43 56 48.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-6"
                    points="58.1599715 47 51 41.8091732 60.4080799 36 68 41.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-7"
                    points="71.1599715 39 64 33.8091732 73.4080799 28 81 33.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-8"
                    points="83.1599715 32 76 26.8091732 85.4080799 21 93 26.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-9"
                    points="95.1599715 25 88 19.8091732 97.4080799 14 105 19.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-10"
                    points="108.125072 17.9993908 100.965101 12.808564 110.37318 6.99939083 117.965101 12.808564"
                  ></polygon>
                  <polygon
                    id="路径-41备份-11"
                    points="120.125072 10.9993908 112.965101 5.80856404 122.37318 -0.000609172977 129.965101 5.80856404"
                  ></polygon>
                </g>
                <g
                  id="编组-7备份-3"
                  transform="translate(383.293818, 450.814695) rotate(-3.000000) translate(-383.293818, -450.814695) translate(342.793818, 426.314695)"
                  fill="#FFFFFF"
                  opacity="0.624906994"
                >
                  <polygon
                    id="路径-41"
                    points="7.16271244 48.8953281 0.00274093049 43.7045013 9.41082082 37.8953281 17.0027409 43.7045013"
                  ></polygon>
                  <polygon
                    id="路径-41备份-3"
                    points="21.109006 40.9462936 13.9490345 35.7554668 23.3571144 29.9462936 30.9490345 35.7554668"
                  ></polygon>
                  <polygon
                    id="路径-41备份-4"
                    points="34.1599715 33 27 27.8091732 36.4080799 22 44 27.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-5"
                    points="46.1599715 26 39 20.8091732 48.4080799 15 56 20.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-6"
                    points="58.1599715 19 51 13.8091732 60.4080799 8 68 13.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-7"
                    points="71.1599715 11 64 5.80917322 73.4080799 0 81 5.80917322"
                  ></polygon>
                </g>
                <g
                  id="编组-7备份-7"
                  transform="translate(397.012070, 468.149397) rotate(-3.000000) translate(-397.012070, -468.149397) translate(363.012070, 447.649397)"
                  fill="#FFFFFF"
                  opacity="0.624906994"
                >
                  <polygon
                    id="路径-41"
                    points="7.16271244 40.8953281 0.00274093049 35.7045013 9.41082082 29.8953281 17.0027409 35.7045013"
                  ></polygon>
                  <polygon
                    id="路径-41备份-3"
                    points="21.109006 32.9462936 13.9490345 27.7554668 23.3571144 21.9462936 30.9490345 27.7554668"
                  ></polygon>
                  <polygon
                    id="路径-41备份-4"
                    points="34.1599715 25 27 19.8091732 36.4080799 14 44 19.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-5"
                    points="46.1599715 18 39 12.8091732 48.4080799 7 56 12.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-6"
                    points="58.1599715 11 51 5.80917322 60.4080799 0 68 5.80917322"
                  ></polygon>
                </g>
                <g
                  id="编组-7备份-4"
                  transform="translate(409.000000, 360.000000)"
                  fill="#FFFFFF"
                  opacity="0.624906994"
                >
                  <polygon
                    id="路径-41"
                    points="7.15997151 78 0 72.8091732 9.40807989 67 17 72.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-3"
                    points="20.1599715 69 13 63.8091732 22.4080799 58 30 63.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-4"
                    points="32.1599715 62 25 56.8091732 34.4080799 51 42 56.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-5"
                    points="44.1599715 55 37 49.8091732 46.4080799 44 54 49.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-6"
                    points="56.1599715 48 49 42.8091732 58.4080799 37 66 42.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-7"
                    points="69.1599715 40 62 34.8091732 71.4080799 29 79 34.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-8"
                    points="81.1599715 33 74 27.8091732 83.4080799 22 91 27.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-9"
                    points="93.1599715 26 86 20.8091732 95.4080799 15 103 20.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-10"
                    points="106.159972 18 99 12.8091732 108.40808 7 116 12.8091732"
                  ></polygon>
                  <polygon
                    id="路径-41备份-11"
                    points="118.159972 11 111 5.80917322 120.40808 0 128 5.80917322"
                  ></polygon>
                </g>
                <path
                  d="M466.169507,488.142 L548.74565,439.734941 C549.698558,439.176335 550.018203,437.951012 549.459598,436.998104 C549.284944,436.700166 549.036115,436.452531 548.737341,436.279311 L520.841975,420.106475 C518.947734,419.008255 516.605662,419.029096 514.731265,420.160852 L434.695131,468.486443 C433.749558,469.057377 433.445853,470.286749 434.016788,471.232321 C434.175632,471.495397 434.392963,471.718329 434.651913,471.883814 L459.904216,488.021602 C461.804129,489.235764 464.224349,489.282273 466.169507,488.142 Z"
                  id="路径-130"
                  fill="url(#linearGradient-16)"
                  opacity="0.291643415"
                ></path>
                <g id="编组-5" transform="translate(329.000000, 261.000000)">
                  <polygon
                    id="路径-127"
                    fill="url(#linearGradient-17)"
                    points="0 75 0 62.0444912 109.790416 0.0783660036 109.790416 12.913791"
                  ></polygon>
                  <polygon
                    id="路径-127"
                    fill="url(#linearGradient-18)"
                    // style="mix-blend-mode: multiply;"
                    opacity="0.661528088"
                    points="3.89520794 69.539183 3.89520794 65.4347271 105.895208 7.539183 105.895208 11.5314435"
                  ></polygon>
                </g>
                <g id="编组-6" transform="translate(337.000000, 273.000000)">
                  <g id="路径-128">
                    <use fill="url(#linearGradient-19)" xlinkHref="#path-21"></use>
                    <use fill="url(#linearGradient-20)" xlinkHref="#path-21"></use>
                  </g>
                  <path
                    d="M59,98.4405108 L119,64.09338"
                    id="路径-134"
                    stroke="#124F5E"
                    fillOpacity
                  ></path>
                  <path
                    d="M59,111.347131 L119,77"
                    id="路径-134备份"
                    stroke="#124F5E"
                    fillOpacity
                  ></path>
                  <path
                    d="M59,124.347131 L119,90"
                    id="路径-134备份-2"
                    stroke="#124F5E"
                    fillOpacity
                  ></path>
                  <path
                    d="M59,138.347131 L119,104"
                    id="路径-134备份-3"
                    stroke="#124F5E"
                    fillOpacity
                  ></path>
                  <path
                    d="M59,151.347131 L119,117"
                    id="路径-134备份-4"
                    stroke="#124F5E"
                    fillOpacity
                  ></path>
                  <path
                    d="M59,164.347131 L119,130"
                    id="路径-134备份-5"
                    stroke="#124F5E"
                    fillOpacity
                  ></path>
                </g>
                <g id="编组-10" transform="translate(473.500000, 357.000000)">
                  <polygon
                    id="路径-42"
                    fill="url(#linearGradient-22)"
                    opacity="0.49311756"
                    points="61.4240113 247 19.5 272.736383 34.603356 278 80.5 251.551193"
                  ></polygon>
                  <polygon
                    id="路径-58"
                    fill="url(#linearGradient-23)"
                    opacity="0.49311756"
                    points="90.418058 247 43.5 274.103378 59.7241568 280 108.5 252.065723"
                  ></polygon>
                  <g id="编组-7" transform="translate(0.500000, 0.000000)" fillRule="nonzero">
                    <g id="编组-2" transform="translate(0.237826, 0.477163)">
                      <g id="undraw_folder_files_re_2cbm">
                        <g
                          id="编组-4"
                          transform="translate(40.469268, 75.941917) rotate(15.000000) translate(-40.469268, -75.941917) translate(8.469268, 41.941917)"
                        >
                          <path
                            d="M54.4964532,24.1141065 L52.7067497,21.7788616 L50.8180829,18.9862205 L38.9454401,24.1636514 L39.9270383,25.4375873 C22.2005152,38.138707 12.5223376,44.8746057 10.8925055,45.6452833 C8.4477573,46.8012998 6.2309618,48.8330871 7.37622879,51.303158 C8.33906434,53.3546149 10.7724271,55.0670273 12.9785607,54.6000755 C14.6596752,54.2566427 28.1565407,46.03058 53.4691573,29.9218873 L53.4691628,29.921896 C55.3329109,28.7358256 55.8822772,26.2634591 54.6962068,24.399711 C54.6338034,24.3016525 54.5671556,24.2063606 54.4964532,24.1141065 Z"
                            id="路径"
                            fill="#FFDCD5"
                            transform="translate(32.108092, 36.831882) rotate(58.000000) translate(-32.108092, -36.831882) "
                          ></path>
                          <path
                            d="M0.400293641,20.5736602 L14.3186346,20.6378121 C14.7301535,20.6397089 15.0632831,20.9728467 15.0651699,21.3843656 L15.0701368,22.467726 C15.0720359,22.8819352 14.7377924,23.2192576 14.3235832,23.2211567 C14.3212848,23.2211672 14.3189863,23.2211672 14.3166879,23.2211566 L0.398346919,23.1570047 C-0.0131720083,23.1551079 -0.346301645,22.8219702 -0.348188362,22.4104512 L-0.353155313,21.3270908 C-0.355054364,20.9128816 -0.0208109408,20.5755592 0.393398268,20.5736601 C0.395696714,20.5736496 0.397995196,20.5736496 0.400293641,20.5736602 Z"
                            id="矩形"
                            fill="#FFDCD5"
                            transform="translate(7.358491, 21.897408) rotate(30.000000) translate(-7.358491, -21.897408) "
                          ></path>
                          <path
                            d="M4.09832766,26.7231871 L18.0166686,26.787339 C18.4281875,26.7892357 18.7613172,27.1223735 18.7632039,27.5338925 L18.7681708,28.6172529 C18.7700699,29.0314621 18.4358265,29.3687845 18.0216172,29.3706835 C18.0193188,29.3706941 18.0170203,29.370694 18.0147219,29.3706835 L4.09638093,29.3065315 C3.68486201,29.3046348 3.35173237,28.971497 3.34984565,28.559978 L3.3448787,27.4766176 C3.34297965,27.0624084 3.67722307,26.725086 4.09143228,26.723187 C4.09373073,26.7231764 4.09602921,26.7231765 4.09832766,26.7231871 Z"
                            id="矩形备份-2"
                            fill="#FFDCD5"
                            transform="translate(11.056525, 28.046935) rotate(30.000000) translate(-11.056525, -28.046935) "
                          ></path>
                          <path
                            d="M10.1066089,23.9770939 L21.89894,24.0219553 C22.4482409,24.024045 22.8930233,24.4688149 22.8951284,25.0181156 L22.8992692,26.098555 C22.9013858,26.6508357 22.4553896,27.1002635 21.9031089,27.10238 C21.9005634,27.1023898 21.8980178,27.1023898 21.8954723,27.1023801 L10.1031411,27.0575188 C9.55384031,27.0554291 9.10905789,26.6106592 9.10695273,26.0613584 L9.102812,24.9809191 C9.10069542,24.4286384 9.54669155,23.9792106 10.0989722,23.977094 C10.1015178,23.9770843 10.1040634,23.9770842 10.1066089,23.9770939 Z"
                            id="矩形备份-4"
                            fill="#FFDCD5"
                            transform="translate(16.001041, 25.539737) rotate(67.000000) translate(-16.001041, -25.539737) "
                          ></path>
                          <path
                            d="M4.07092697,30.0701637 L18.6617061,30.0547649 C19.0639644,30.0543404 19.3949271,30.3713376 19.4118348,30.7732406 L19.4371348,31.3746326 C19.454545,31.7884801 19.133169,32.1380835 18.7193215,32.1554937 C18.7169134,32.155595 18.7145048,32.1556847 18.7120959,32.1557627 L4.1008749,32.6293823 C3.68687878,32.6428018 3.34038988,32.3180704 3.32697029,31.9040743 C3.32674497,31.8971231 3.32661635,31.8901692 3.32658446,31.8832145 L3.32172639,30.8236019 C3.31982734,30.4093926 3.65407076,30.0720702 4.06827997,30.0701712 C4.0691623,30.0701672 4.07004463,30.0701647 4.07092697,30.0701637 Z"
                            id="矩形备份-3"
                            fill="#FFDCD5"
                            transform="translate(11.393620, 31.354186) rotate(30.000000) translate(-11.393620, -31.354186) "
                          ></path>
                          <path
                            d="M57.1568564,43.2420942 C62.8019599,30.3333061 64.0149526,26.8352196 63.9495888,25.3567895 C63.5377681,16.0420348 61.4734674,7.58977166 57.7566868,-1.20002349e-11 C53.6342603,3.27168914 51.0019384,8.04300792 50.4460686,13.2511494 L46.4746039,35.9171425 L57.1568564,43.2420942 Z"
                            id="路径"
                            fill="#EAEAEA"
                          ></path>
                        </g>
                        <path
                          d="M106.498778,112.386093 C113.761308,108.482557 119.388491,104.024357 123.380326,99.0114926 C124.35204,97.7912347 125.354903,93.2285733 126.388914,85.3235082 L116.983209,89.7477203 C116.978034,92.9009995 116.529431,95.1642217 115.637399,96.5373875 C112.18429,101.852992 107.179357,104.230061 100.622602,103.668596 C98.1909346,104.845211 106.601499,112.655524 106.498778,112.386093 Z"
                          id="路径备份"
                          fill="#FFDCD5"
                        ></path>
                        <polygon
                          id="路径"
                          fill="#FFD0C7"
                          points="108.096921 243.939451 102.554157 243.939033 99.9174035 221.203523 108.097707 221.203941"
                        ></polygon>
                        <polygon
                          id="路径"
                          fill="#FFD0C7"
                          points="79.4654659 243.939451 73.923095 243.939033 71.2863415 221.203523 79.4666451 221.203941"
                        ></polygon>
                        <path
                          d="M78.9443539,249.016257 L74.9824652,250.380447 L74.9824652,250.380447 C65.7933333,252.047733 61.1010479,251.678285 60.9056083,249.272103 C60.8925788,245.166544 65.0488259,243.180013 68.1044016,243.180077 C70.1414521,243.180119 71.6389009,242.79033 72.5967475,242.01071 L74.3501998,242.496917 L76.781157,241.659869 L78.2175077,241.165226 L80.0964119,246.62202 C80.4360069,247.608302 79.9202149,248.680235 78.9443539,249.016257 Z"
                          id="路径"
                          fill="#2F2E41"
                          transform="translate(70.553216, 246.284656) rotate(19.000000) translate(-70.553216, -246.284656) "
                        ></path>
                        <path
                          d="M107.586457,249.016256 L103.624568,250.380446 L103.624568,250.380446 C94.4354362,252.047732 89.7431508,251.678284 89.5477111,249.272102 C89.5346817,245.166543 93.6909284,243.180013 96.7465045,243.180076 C98.783555,243.180118 100.281004,242.790329 101.23885,242.010709 L102.992303,242.496916 L105.42326,241.659869 L106.85961,241.165225 L108.738515,246.622019 C109.07811,247.608302 108.562318,248.680234 107.586457,249.016256 Z"
                          id="路径"
                          fill="#2F2E41"
                          transform="translate(99.195319, 246.284655) rotate(19.000000) translate(-99.195319, -246.284655) "
                        ></path>
                        <path
                          d="M72.2155752,116.477502 L113.284157,117.803874 C118.218626,120.499138 117.725661,145.434514 111.805263,192.610005 C111.805263,192.610005 110.578095,228.494419 109.758215,229.319889 C108.938336,230.145358 108.119973,229.321406 108.937201,231.382453 C109.75443,233.4435 110.574314,232.618018 109.754434,233.4435 C109.028127,234.231847 108.343806,235.058363 107.704359,235.919563 L97.8023371,235.928738 C97.8023371,235.928738 97.0595706,231.805818 97.0599487,231.393458 C97.0603268,230.981099 96.2434721,228.507693 96.2438502,228.095329 C96.2442283,227.682965 96.9688864,226.953364 96.9688864,226.953364 C97.2198335,226.11488 97.3896417,225.254062 97.4759364,224.382947 C97.4766926,223.558224 97.9586153,191.258864 97.9586153,191.258864 L92.4098915,149.443582 L84.1655568,191.866815 C84.1655568,191.866815 83.1394017,226.458027 82.3195221,227.283508 C81.4996422,228.108991 81.5000203,227.696627 81.9080717,229.34569 C82.3161232,230.994752 83.9547394,230.580875 82.7249223,231.819096 C81.4951048,233.057317 81.0874359,230.995895 81.4951048,233.057317 L81.9027782,235.118744 L69.6157865,235.307087 C69.6157865,235.307087 67.980727,231.832758 68.8009847,230.594916 C69.6212423,229.357075 69.5717822,229.694802 68.5743109,227.671265 C67.5768392,225.647728 67.1676579,225.235744 67.5775954,224.823005 C67.987533,224.410266 67.9895441,222.21696 67.9895441,222.21696 L68.9973913,185.466374 C68.9973913,185.466374 68.4111385,140.926478 68.4122728,139.689395 C68.2926436,131.230013 69.5604108,123.492715 72.2155752,116.477502 Z"
                          id="路径"
                          fill="#E89B18"
                          transform="translate(92.034385, 176.203120) scale(-1, 1) rotate(-5.000000) translate(-92.034385, -176.203120) "
                        ></path>
                        <path
                          d="M82.3014537,31.7508477 C83.975314,34.4013219 84.8122443,36.9289387 84.8122443,39.3336972 C84.8122443,41.738456 88.6802776,41.0893682 96.4163447,37.3864338 L95.3155484,28.9630918 L82.3014537,31.7508477 Z"
                          id="路径-2"
                          fill="#FFD0C7"
                        ></path>
                        <path
                          d="M104.360154,123.168197 C109.238171,121.487371 112.720115,121.907981 117.248632,119.065532 C115.853818,104.968114 112.791812,87.4672877 113.433533,70.4181216 C113.692749,63.5313032 115.697992,57.3579145 116.894787,50.5223288 C117.385754,47.7401841 115.789545,45.015962 113.164633,44.156139 L101.423076,40.7539219 L96.4163447,36.3680647 L93.0822338,37.8115695 C91.3089909,38.5792958 89.4054936,38.9929186 87.4767394,39.0296217 L84.7091685,39.0822872 L84.7091685,39.0822872 L81.2451171,45.2348709 L68.4238813,54.1241777 C66.8953483,55.1833734 66.1142779,57.0639554 66.4283011,58.9289317 C68.6516178,71.8257059 76.4750726,83.6716272 75.5486623,96.6602601 C74.8700846,106.174176 74.3491352,115.564313 71.9915402,124.847572 C78.0110657,125.636955 80.778283,127.147234 86.6092677,126.714615 C92.8050793,126.254928 98.7935323,125.086308 104.360154,123.168197 Z"
                          id="路径"
                          fill="#EAEAEA"
                        ></path>
                        <path
                          d="M128.402066,86.7636238 L127.465267,68.7140247 C127.002301,60.4897691 122.421549,49.3408898 115.327671,45.3403265 L113.433533,67.4016656 L116.983209,91.998474 L128.402066,86.7636238 Z"
                          id="路径"
                          fill="#EAEAEA"
                        ></path>
                        <ellipse
                          id="椭圆形"
                          fill="#FFDCD5"
                          cx="87.3296088"
                          cy="20.0368863"
                          rx="13.292993"
                          ry="13.4348666"
                        ></ellipse>
                        <path
                          d="M89.5744284,32.7516515 C91.9906951,32.7516515 93.6287854,32.1249045 96.3197279,32.7691162 C96.5913926,31.0517058 98.1497352,29.7381612 98.8584274,28.9630918 C106.185809,20.9494129 107.845338,8.9700012 99.0853126,4.37504882 C98.9708362,4.31500172 99.4548963,3.43073418 99.3621923,3.33600823 C99.2757775,3.24770888 98.5968358,3.69875687 98.5070336,3.61208198 C98.3224897,3.43396446 98.7061738,2.00173739 98.5070336,1.83163231 C98.2809098,1.63847765 97.5114565,2.92245956 97.2659745,2.74177016 C97.1311482,2.64252991 97.406774,1.63083887 97.2659745,1.53588919 C97.0924709,1.41888525 96.5009812,2.21978369 96.3182463,2.10993222 C95.1529272,1.40939771 93.798098,0.861453971 92.230739,0.557341284 C87.0889545,-0.440312535 76.3599679,-1.01192195 74.1286974,8.9700012 C73.5669817,10.3343026 72.9578284,11.8483994 72.3012372,13.5122918 L74.1286974,13.1929706 L74.7059792,14.4351386 L76.13572,13.5122918 C74.0887542,14.258364 75.4047456,16.7374044 80.0836937,20.9494129 C87.1021159,27.2674257 89.0592288,28.3639755 89.5744284,32.7516515 Z"
                          id="路径"
                          fill="#2F2E41"
                        ></path>
                      </g>
                      <ellipse
                        id="椭圆形"
                        fill="#FFC8BE"
                        cx="81.2049594"
                        cy="22.1216069"
                        rx="3.73755241"
                        ry="3.7774426"
                      ></ellipse>
                    </g>
                  </g>
                </g>
                <g
                  id="编组"
                  transform="translate(383.000049, 276.997196) rotate(2.000000) translate(-383.000049, -276.997196) translate(320.000049, 231.997196)"
                  fill="#124F5E"
                >
                  <path
                    d="M9.60095893,73.0293107 L8.92583839,74.2714313 C8.32086964,73.8790875 7.48411071,73.5908866 6.41664643,73.4234625 L7.11418661,72.18315 C8.10137411,72.3545518 8.92583839,72.6340741 9.60095893,73.0293107 L9.60095893,73.0293107 Z M9.24260625,77.0684625 L8.54072679,78.3398732 C7.92274018,77.9207705 7.073325,77.6050875 6.00694554,77.3675116 L6.7037625,76.1319 C7.70324464,76.3481411 8.55446786,76.646467 9.24260625,77.0684625 L9.24260625,77.0684625 Z M12.6471375,77.5324045 L11.2455482,78.6899089 L11.2455482,83.2956991 L10.2355795,83.9371902 L10.2355795,79.5306455 L5.95234286,83.0931991 L5.81601696,82.0618955 L10.2355795,78.3890518 L10.2355795,69.3033107 L11.2455482,68.6408464 L11.2455482,77.5465071 L12.4941777,76.5014625 L12.6471375,77.5324045 Z M2.58505714,78.5524982 L2.58505714,76.1984357 C1.93705714,76.7328911 1.2767625,77.2590295 0.577052679,77.7952929 L0.389016964,76.8399268 C2.13919554,75.5356098 3.70820893,74.1741589 5.06676696,72.8054759 L5.40703929,73.6682705 C4.82195893,74.2425027 4.21011964,74.8019089 3.55922679,75.370717 L3.55922679,77.9193241 L5.43452143,76.700708 L5.43452143,77.8028866 L3.55922679,79.0182482 L3.55922679,79.798958 C4.31896339,80.0246009 5.10762857,80.3290741 5.89774018,80.7145473 L5.33905714,82.0485161 C4.63139196,81.5296098 4.04739643,81.1405205 3.55922679,80.8978821 L3.55922679,88.1770339 L2.58505714,88.7961054 L2.58505714,81.3676098 C2.04481607,83.2743643 1.33028036,85.1471277 0.4161375,87.0018107 L-7.23214286e-05,86.0005205 C1.14188304,83.9024759 1.96381607,81.8004536 2.47693661,79.7201277 L0.3756375,81.0819402 L0.3756375,79.9880786 L2.58505714,78.5524982 Z"
                    id="Fill-1"
                  ></path>
                  <path
                    d="M22.704083,72.1888634 C23.692717,70.45785 24.4249714,68.708033 24.8997616,66.9245866 L20.5930205,69.7060688 C20.9629446,70.9040732 21.6753107,71.7202205 22.704083,72.1888634 L22.704083,72.1888634 Z M22.0325786,63.8715375 L22.0325786,61.549658 L23.0335071,60.8929795 L23.0335071,63.2177518 L26.500958,60.9548143 L26.500958,62.0898991 L23.0335071,64.3477741 L23.0335071,67.0167964 L25.9375741,65.1364393 L25.9375741,66.1887161 C25.4327705,68.3218366 24.5978196,70.4018009 23.4348911,72.4257161 C24.3819402,72.6564214 25.5481232,72.6513589 26.9207839,72.4188455 L26.3711411,73.7557071 C24.9286902,73.949167 23.7071812,73.890225 22.7330116,73.5944304 C21.6185384,75.3189348 20.2661277,77.0123411 18.6779491,78.6732027 L18.1977348,78.0024214 C19.6980429,76.4771625 20.9774089,74.9114036 22.0181143,73.314908 C20.820833,72.7421223 20.0386768,71.743725 19.6412705,70.3208009 L18.8905741,70.8057161 L18.8905741,69.6988366 L22.0325786,67.6647964 L22.0325786,64.9997518 L18.6215384,67.2203813 L18.6215384,66.0975911 L22.0325786,63.8715375 Z M14.2218643,81.2760509 L14.0121321,80.3098366 C14.3755473,80.127225 14.7252214,79.9370196 15.0611545,79.7229482 C15.4393955,79.4821179 15.6357482,79.1140018 15.6357482,78.6280018 L15.6357482,74.7548277 C15.0748955,75.3746223 14.5151277,75.9774214 13.9286009,76.5805821 L13.6776455,75.5944795 C14.3477036,74.9688991 14.9910027,74.3114973 15.6357482,73.6208277 L15.6357482,69.7964705 L13.9427036,70.8972027 L13.9427036,69.7816446 L15.6357482,68.6783813 L15.6357482,65.7128411 L16.6185964,65.0680955 L16.6185964,68.0376134 L18.1127571,67.0638054 L18.1127571,68.1858723 L16.6185964,69.1571491 L16.6185964,72.5161179 C17.1393107,71.8876446 17.6470071,71.2674884 18.1409625,70.6227429 L18.1409625,71.7614438 C17.6329045,72.4141446 17.1255696,73.0335777 16.6185964,73.6356536 L16.6185964,78.292792 C16.6185964,79.2666 16.2110652,80.0125955 15.3970875,80.5293321 L14.2218643,81.2760509 Z"
                    id="Fill-3"
                  ></path>
                  <path
                    d="M34.7199268,64.8097996 L39.4392616,61.7892951 L39.4392616,60.6169647 L34.7199268,63.6447013 L34.7199268,64.8097996 Z M39.4392616,58.4397281 L34.7199268,61.4815674 L34.7199268,62.7128397 L39.4392616,59.6789558 L39.4392616,58.4397281 Z M34.7199268,68.4041746 L33.7157437,69.0420496 L33.7157437,61.1315317 L40.4749045,56.7654871 L40.4749045,63.2903263 C40.4749045,64.1961522 40.0539937,64.9331076 39.2295295,65.4567147 L38.0633464,66.1972862 L37.7946723,65.2986924 L38.9152929,64.6521388 C39.2595429,64.4330049 39.4392616,64.1010496 39.4392616,63.6989424 L39.4392616,62.7106701 L34.7199268,65.7250272 L34.7199268,68.4041746 Z M37.6605161,51.2484469 L37.6605161,52.3177192 L41.1366455,50.0428487 L41.1366455,51.0332906 L37.6605161,53.3038219 L37.6605161,54.4566254 L40.6401589,52.5151567 L40.6401589,53.4882415 L37.6605161,55.4257326 L37.6605161,56.5452683 L41.573467,54.0067862 L41.573467,55.0145853 L32.6696143,60.7786031 L32.6696143,60.4632817 L32.0082348,61.0740362 C31.7735518,60.1819513 31.4658241,59.3708665 31.0995161,58.6490987 L31.8614223,57.8871924 C32.1554089,58.4415362 32.434208,59.1061701 32.6696143,59.8988129 L32.6696143,59.7830987 L36.5883509,57.2406388 L36.5883509,56.1229112 L33.6123241,58.0582326 L33.6123241,57.0945496 L36.5883509,55.1548888 L36.5883509,54.0038933 L33.1114982,56.2751478 L33.1114982,55.2951924 L36.5883509,53.0195987 L36.5883509,51.9517728 L37.6605161,51.2484469 Z M30.9234134,55.7175496 L30.9234134,70.7821031 L29.9004268,71.4319112 L29.9004268,56.3886924 L30.9234134,55.7175496 Z M29.2296455,60.0326076 C29.2003554,61.7198665 29.0256991,63.4017013 28.7346054,65.0755808 L27.9354536,65.3435317 C28.2258241,63.7213621 28.3856545,62.1002772 28.414583,60.4976344 L29.2296455,60.0326076 Z"
                    id="Fill-5"
                  ></path>
                  <path
                    d="M53.4424621,52.5031513 C54.0655112,51.0621469 54.5182433,49.5408656 54.7988504,47.9577496 L51.8738103,49.8453388 C52.0907746,51.0343031 52.6031719,51.9321737 53.4424621,52.5031513 L53.4424621,52.5031513 Z M49.9724799,58.7520844 L48.9256272,59.4170799 L48.9256272,44.5543031 L55.737221,40.092071 C55.737221,41.9926781 55.6435647,43.3208612 55.4710781,44.0661335 C55.283404,44.8045353 54.6896451,45.5147317 53.6912478,46.1623701 L52.5717121,46.8888388 L52.2614531,46.0162808 C52.5098772,45.8546424 52.8049487,45.6799862 53.1777656,45.4373478 C53.5513058,45.1947094 53.8474621,44.9683433 54.0340513,44.8124906 C54.2058147,44.6324103 54.3464799,44.4215933 54.4553237,44.1453254 C54.5648906,43.7493656 54.6270871,43.0077094 54.6585469,41.9272272 L49.9724799,44.9900397 L49.9724799,49.9509281 L55.8782478,46.1305487 L55.8782478,47.1925888 C55.565096,49.2092719 55.0176228,51.1178344 54.2058147,52.9197228 C54.9550647,53.2278121 55.8782478,53.3579906 56.9760871,53.3268924 L56.2228594,54.7487317 C55.1897478,54.6865353 54.299471,54.5180263 53.582404,54.1889638 C52.8360469,55.6032094 51.9208192,56.9530888 50.8678192,58.2006335 L50.3272165,57.4730799 C51.3162121,56.2989415 52.1533326,55.066946 52.8360469,53.7785397 C51.7653281,53.0661737 51.1151585,51.9683344 50.8678192,50.4944237 L49.9724799,51.0722719 L49.9724799,58.7520844 Z M48.0809129,52.4286603 C47.4983638,53.1265621 46.9168996,53.8060219 46.320971,54.4605308 L46.320971,59.4984415 C46.320971,60.5127496 45.8787254,61.3014147 44.9949576,61.8622674 L43.5828817,62.7590531 L43.3406049,61.7508924 C43.7799576,61.5216335 44.204846,61.285504 44.6149085,61.0240621 C45.0256942,60.7626201 45.2386808,60.3738924 45.2386808,59.9009103 L45.2386808,55.6469638 C44.538971,56.3835576 43.8103326,57.1215978 43.0835022,57.8415576 L42.8108504,56.8214638 C43.6436317,56.0664281 44.447846,55.2784862 45.2386808,54.4652317 L45.2386808,50.5486647 L43.0379397,51.9795442 L43.0379397,50.8180621 L45.2386808,49.3835665 L45.2386808,46.3279862 L46.320971,45.6181513 L46.320971,48.678071 L48.0346272,47.5610665 L48.0346272,48.7301424 L46.320971,49.8446156 L46.320971,53.2939862 C46.9168996,52.6213969 47.4983638,51.9412138 48.0809129,51.2255933 L48.0809129,52.4286603 Z"
                    id="Fill-7"
                  ></path>
                  <path
                    d="M71.0614446,42.2676442 L71.0614446,32.3606933 L67.878217,34.4359567 L67.878217,44.3016844 L71.0614446,42.2676442 Z M72.2044848,43.8294254 L71.0614446,44.5566174 L71.0614446,43.4385281 L67.878217,45.4678674 L67.878217,46.6159701 L66.764467,47.3247201 L66.764467,33.9984121 L72.2044848,30.442729 L72.2044848,43.8294254 Z M59.3873196,43.0693272 L58.3925384,43.0266576 C59.4346902,40.6986308 60.1788777,38.4056799 60.6547527,36.112729 L61.7826054,35.6314299 C61.5920384,36.4985638 61.3851991,37.3414701 61.1624491,38.1424299 L65.7819804,35.1259031 L65.7819804,36.323546 L63.4412973,37.8480817 C63.4253866,39.1039433 63.3613821,40.304479 63.2492839,41.4146129 L65.9269848,39.6828763 L65.9269848,40.8801576 L63.0898152,42.7109746 C63.0099,43.2121621 62.9303464,43.7129879 62.8345205,44.1892246 C63.8571455,44.6560594 64.9148464,45.2599433 65.9750786,46.0041308 L65.2840473,47.5901397 C64.1934402,46.622479 63.281467,45.9426576 62.5311321,45.5246397 C61.8780696,47.8776174 60.7180339,50.2396353 59.0398152,52.6157558 L58.2981589,52.0910638 C59.9727616,49.6983094 61.0832571,47.3164031 61.6234982,44.9511308 C61.7189625,44.4756174 61.8147884,43.9823853 61.8939804,43.4822826 L58.5816589,45.6197424 L58.5816589,44.433671 L62.0534491,42.1884522 C62.1807348,41.0696397 62.2443777,39.8716353 62.2602884,38.6175817 L60.7180339,39.6221263 C60.3217125,40.8103674 59.8780205,41.9595549 59.3873196,43.0693272 L59.3873196,43.0693272 Z"
                    id="Fill-9"
                  ></path>
                  <path
                    d="M89.8579647,32.6728688 L88.7980942,34.1156813 C88.0477594,32.9845741 87.0435763,31.8581679 85.7703576,30.7483955 L86.7546522,29.4570964 C88.098746,30.5762705 89.1398129,31.6448196 89.8579647,32.6728688 L89.8579647,32.6728688 Z M87.4518308,20.8884536 L82.1116165,24.3757929 L82.1116165,30.1897125 L87.4518308,26.7425116 L87.4518308,20.8884536 Z M88.6784022,18.8536902 L88.6784022,27.2017527 L80.9052951,32.2071188 L80.9052951,23.9418643 L88.6784022,18.8536902 Z M83.7768174,31.974967 C82.9346344,34.5911946 81.9438308,37.0146857 80.8047683,39.2620741 L79.7524915,39.1170696 C80.9052951,36.9680384 81.8935674,34.6190384 82.6995897,32.1163554 L83.7768174,31.974967 Z M79.1529469,26.8907705 L78.3375228,28.3042929 C77.6566165,27.9018241 76.728371,27.6092839 75.5553174,27.4266723 L76.3812281,26.0239982 C77.4740049,26.1881679 78.3870629,26.4901098 79.1529469,26.8907705 L79.1529469,26.8907705 Z M77.9386701,30.2211723 L77.9386701,37.9964491 C78.4705942,37.162583 79.0361478,36.2180652 79.6523263,35.1697661 L79.9690942,36.310275 C79.0025183,37.9519714 77.9882103,39.4985652 76.910621,40.9768152 L76.4474022,40.145842 C76.6788308,39.7871277 76.7945451,39.4667438 76.7945451,39.1850518 L76.7945451,32.1781902 L74.4017906,33.7276768 L74.4017906,32.5166545 L77.9386701,30.2211723 Z"
                    id="Fill-11"
                  ></path>
                  <path
                    d="M104.845604,16.5359692 L104.845604,11.6640362 L99.7747875,14.9622549 L99.7747875,19.8030897 L104.845604,16.5359692 Z M98.4777027,20.6387638 L98.4777027,15.8058844 L93.504158,19.0404603 L93.504158,23.8426031 L98.4777027,20.6387638 Z M99.7747875,10.4295094 L99.7747875,13.6930138 L106.127863,9.55080402 L106.127863,18.1404201 L104.845604,18.9627147 L104.845604,17.8131656 L99.7747875,21.0719692 L99.7747875,27.2547281 L98.4777027,28.0781076 L98.4777027,21.9054737 L93.504158,25.1017192 L93.504158,26.234996 L92.2620375,27.0312549 L92.2620375,18.5909826 L98.4777027,14.5388129 L98.4777027,11.2807326 L99.7747875,10.4295094 Z"
                    id="Fill-13"
                  ></path>
                  <path
                    d="M125.646115,6.63625045 L124.412312,7.98685313 C123.442481,5.63785313 122.382611,3.69023705 121.2327,2.16136205 L122.531231,0.889589732 C123.722004,2.54430402 124.748606,4.46154509 125.646115,6.63625045 L125.646115,6.63625045 Z M119.790611,2.18631295 L118.684454,3.66600938 C117.728727,2.84046027 116.445745,2.06481295 114.801879,1.40198705 L115.896825,3.61607148e-05 C117.581914,0.692875446 118.887316,1.41789777 119.790611,2.18631295 L119.790611,2.18631295 Z M115.312106,16.6509603 C114.036718,17.4616835 113.418731,17.2280853 113.418731,15.9924737 L113.418731,5.40642455 L114.728834,4.5530317 L114.728834,14.8790853 C114.728834,15.433429 115.056812,15.5014112 115.714213,15.0823085 L119.163584,12.8837371 C119.606191,12.6016835 119.919704,12.2158487 120.104486,11.7446746 C120.326151,11.1567013 120.49249,9.74824152 120.585062,7.51206295 L121.844178,7.13129063 C121.695919,9.77897813 121.436285,11.4908263 121.047196,12.2975719 C120.696075,12.9864335 120.141008,13.5809156 119.403329,14.0499201 L115.312106,16.6509603 Z M111.986044,8.56687098 C111.479432,12.0596344 110.756941,15.2457549 109.819294,18.1237862 L108.704459,18.1198085 C109.639213,15.1915138 110.306017,12.1912594 110.738861,9.11796027 L111.986044,8.56687098 Z"
                    id="Fill-15"
                  ></path>
                </g>
                <polygon
                  id="路径-136"
                  fillOpacity="0.3"
                  fill="url(#linearGradient-24)"
                  opacity="0.672316778"
                  points="77 560.378446 367.760648 736 367.760648 785.901039 77 785.901039"
                ></polygon>
                <polygon
                  id="路径-136备份"
                  fillOpacity="0.3"
                  fill="url(#linearGradient-25)"
                  opacity="0.628162202"
                  points="33 586.170219 354.881111 780.320709 354.700887 785 33 785"
                ></polygon>
                <g
                  id="编组-2"
                  transform="translate(291.500000, 540.000000) scale(-1, 1) translate(-291.500000, -540.000000) translate(228.000000, 462.000000)"
                >
                  <polygon
                    id="路径-118备份-3"
                    fill="url(#linearGradient-26)"
                    points="90 11 90 95.2771735 105 105 105 20.989887"
                  ></polygon>
                  <polygon
                    id="路径-117备份-3"
                    fill="url(#linearGradient-27)"
                    points="105 21 105 105 127 92.7121274 127 9.37745046"
                  ></polygon>
                  <polygon
                    id="路径-119备份-3"
                    fill="url(#linearGradient-28)"
                    points="110.570364 4.77484718e-12 90 11.1669767 105.106314 21 127 9.37745046"
                  ></polygon>
                  <polygon
                    id="路径-118备份-2"
                    fill="url(#linearGradient-29)"
                    points="60 74 60 113.330048 75 123 75 83.9355603"
                  ></polygon>
                  <polygon
                    id="路径-117备份-2"
                    fill="url(#linearGradient-30)"
                    points="75 83.7880828 75 123 97 110.627177 97 72"
                  ></polygon>
                  <polygon
                    id="路径-119备份-2"
                    fill="url(#linearGradient-31)"
                    points="80.6626225 63 60 74.0389138 75.1063142 84 97 72.2260812"
                  ></polygon>
                  <polygon
                    id="路径-118备份"
                    fill="url(#linearGradient-32)"
                    points="29 25 29 131.307757 44 141 44 34.9584632"
                  ></polygon>
                  <polygon
                    id="路径-117"
                    fill="url(#linearGradient-33)"
                    points="15 73.7352391 15 156 37 143.682642 37 62"
                  ></polygon>
                  <polygon
                    id="路径-117备份"
                    fill="url(#linearGradient-34)"
                    points="44 34.7895663 44 141 66 128.62562 66 23"
                  ></polygon>
                  <polygon
                    id="路径-119"
                    fill="url(#linearGradient-35)"
                    points="20.678046 53 0 64.2303867 15 73.9075644 37 62"
                  ></polygon>
                  <polygon
                    id="路径-119备份"
                    fill="url(#linearGradient-36)"
                    points="50.1355948 14 29 25.12913 44.1063142 35 66 23.332716"
                  ></polygon>
                  <polygon
                    id="路径-118"
                    fill="url(#linearGradient-37)"
                    points="0 64.2303867 0 146.357295 15 156 15 73.9075644"
                  ></polygon>
                </g>
                <text id="项目查重系统" fontSize="30" fill="#FFFFFF">
                  <tspan x="242" y="710">
                    项目查重系统
                  </tspan>
                </text>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
