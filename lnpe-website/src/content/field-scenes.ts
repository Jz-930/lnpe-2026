import type { Locale } from "@/i18n/config";

export type FieldScene = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
};

// Illustrative scene assets; private source mapping is kept outside the application.
export const fieldScenes = {
  "factory": {
    "src": "/images/09_field-scenes/factory.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative factory hall with cranes, components and assembly areas",
      "zh": "厂房内行车、零部件与装配区域的场景示意"
    },
    "caption": {
      "en": "Manufacturing, assembly and system integration share an industrial workspace. Illustrative scene.",
      "zh": "厂房空间衔接零部件制造、装配和系统集成。场景示意。"
    }
  },
  "engineering": {
    "src": "/images/09_field-scenes/engineering.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative engineering workspace with staff at computer workstations",
      "zh": "工程人员在电脑工作区协作的场景示意"
    },
    "caption": {
      "en": "Equipment and process design starts with material properties, particle targets and throughput. Illustrative scene.",
      "zh": "围绕物料特性、目标粒径和处理量开展设备与工艺设计。场景示意。"
    }
  },
  "laboratory": {
    "src": "/images/09_field-scenes/laboratory.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative compact powder-processing apparatus with connected pipework",
      "zh": "小型粉体试验装置与连接管路的场景示意"
    },
    "caption": {
      "en": "Small-scale trials compare equipment configurations and operating conditions before scale-up. Illustrative scene.",
      "zh": "小型试验比较设备配置与工况，为工艺放大提供参考。场景示意。"
    }
  },
  "analysis": {
    "src": "/images/09_field-scenes/analysis.webp",
    "width": 1600,
    "height": 429,
    "alt": {
      "en": "Montage illustrating laboratory instruments and microscopic sample observation",
      "zh": "检测仪器与样品显微观察场景的组合示意图"
    },
    "caption": {
      "en": "Particle-size measurement and microscopy support sample evaluation. Illustrative laboratory montage.",
      "zh": "粒度检测与显微观察共同支持样品评价。检测场景组合示意。"
    }
  },
  "machining": {
    "src": "/images/09_field-scenes/machining.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative metal component held in a machining fixture",
      "zh": "金属工件在机床夹具中加工的场景示意"
    },
    "caption": {
      "en": "Machining prepares component surfaces and interfaces for equipment assembly. Illustrative scene.",
      "zh": "机械加工形成部件表面与配合接口，衔接后续装配。场景示意。"
    }
  },
  "ceramic": {
    "src": "/images/09_field-scenes/ceramic.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative ceramic-lined chamber inside a metal equipment housing",
      "zh": "金属设备壳体内部陶瓷内衬的结构示意"
    },
    "caption": {
      "en": "Product-contact liners are evaluated against wear, purity and cleaning requirements. Illustrative detail.",
      "zh": "接触物料的内衬结合磨损、纯度和清洁要求选配。结构示意。"
    }
  },
  "assembly": {
    "src": "/images/09_field-scenes/assembly.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative assembly area with machined housings and a technician",
      "zh": "技术人员与加工壳体所在装配区域的场景示意"
    },
    "caption": {
      "en": "Machined parts, connections and assembly interfaces are checked together. Illustrative scene.",
      "zh": "将加工零件、连接部位与装配接口结合检查。场景示意。"
    }
  },
  "production": {
    "src": "/images/09_field-scenes/production.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative integrated powder-processing system with a platform and pipework",
      "zh": "带平台、管路和收集部件的成套粉体系统示意"
    },
    "caption": {
      "en": "Platforms, process equipment and collection stages are coordinated as one system. Illustrative scene.",
      "zh": "平台、工艺设备与收集环节按整套系统协调配置。场景示意。"
    }
  },
  "classification": {
    "src": "/images/09_field-scenes/classification.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative powder-processing equipment with collection and control components",
      "zh": "带收集与控制部件的粉体加工设备场景示意"
    },
    "caption": {
      "en": "Classification and collection are configured around the target particle-size distribution. Illustrative scene.",
      "zh": "分级与收集配置围绕目标粒径分布展开。场景示意。"
    }
  },
  "shaping": {
    "src": "/images/09_field-scenes/shaping.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative shaping equipment with feed, chamber and drive components",
      "zh": "带给料、腔体与驱动部件的整形设备示意"
    },
    "caption": {
      "en": "Shaping trials evaluate particle morphology alongside size distribution and yield. Illustrative equipment view.",
      "zh": "整形试验结合粒径分布与收率评价颗粒形貌。设备示意。"
    }
  },
  "quality": {
    "src": "/images/09_field-scenes/quality.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative technician checking equipment and recording inspection notes",
      "zh": "技术人员核对设备并填写检查记录的场景示意"
    },
    "caption": {
      "en": "Inspection records connect component checks with assembly and delivery requirements. Illustrative scene.",
      "zh": "检查记录衔接部件核对、装配要求与交付确认。场景示意。"
    }
  },
  "delivery": {
    "src": "/images/09_field-scenes/delivery.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative workshop with protected equipment and prepared components",
      "zh": "车间内带保护包装的设备与配套部件场景示意"
    },
    "caption": {
      "en": "Equipment protection and component preparation form part of the agreed delivery scope. Illustrative scene.",
      "zh": "设备保护与配套部件准备纳入约定的交付范围。场景示意。"
    }
  },
  "equipment": {
    "src": "/images/09_field-scenes/equipment.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative stainless-steel equipment chamber with flanged connections",
      "zh": "带法兰连接的不锈钢设备腔体结构示意"
    },
    "caption": {
      "en": "Chamber connections and access points are considered during equipment configuration. Illustrative detail.",
      "zh": "设备配置同时考虑腔体连接与检修接口。结构示意。"
    }
  },
  "components": {
    "src": "/images/09_field-scenes/components.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative array of motors and drive components prepared for assembly",
      "zh": "成组电机与传动配套部件的场景示意"
    },
    "caption": {
      "en": "Drive components and interfaces are matched to the system configuration. Illustrative detail.",
      "zh": "驱动部件与连接接口按系统配置匹配。部件示意。"
    }
  },
  "training": {
    "src": "/images/09_field-scenes/training.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative technical meeting room with process diagrams",
      "zh": "配有工艺图的技术交流空间场景示意"
    },
    "caption": {
      "en": "Process diagrams and operating information support technical discussion and training. Illustrative scene.",
      "zh": "工艺图与操作资料支持技术交流及培训。场景示意。"
    }
  },
  "powder": {
    "src": "/images/09_field-scenes/powder.webp",
    "width": 1600,
    "height": 900,
    "alt": {
      "en": "Illustrative powder-processing hall with bulk bags and an overhead process line",
      "zh": "带吨袋与上层工艺设备的粉体处理车间示意"
    },
    "caption": {
      "en": "Powder processing, collection and packaging are planned as connected stages. Illustrative scene.",
      "zh": "粉体加工、收集与包装作为衔接的工序共同规划。场景示意。"
    }
  }
} satisfies Record<string, FieldScene>;

export type FieldSceneKey = keyof typeof fieldScenes;
