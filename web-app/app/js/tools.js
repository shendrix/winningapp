var fastq = {
    name: "Fastq Converter",
    id: "fastq_conv",
    description: "This tool does a bunch of stuff and is really neat",
    configuration: [
        {
            min: 1,
            default: 50,
            description: "Minimum accepted quality",
            name: "accepted_qual_limit",
            type: "int"
        }
    ],
    inputs: [
        {
            name: "fastq_file",
            format: "fastq"
        }
    ],
    outputs: [
        {
            name: "bam_file",
            format: "bam"
        }
    ]
};

var eater = {
    name: "BAM eater",
    id: "bam_eater",
    description: "Eats your bams!",
    configuration: [
        {
            default: 1,
            description: "Size of bamage",
            name: "bam_size",
            type: "int"
        }
    ],
    inputs: [
        {
            name: "bam1",
            format: "bam"
        },
        {
            name: "bam2",
            format: "bam"
        },
        {
            name: "bam2",
            format: "bam"
        }
    ],
    outputs: [
        {
            name: "smushed_bams",
            format: "smash"
        },
        {
            name: "index",
            format: "smi"
        }
    ]
};

var aligner = {
    name: "Bam aligner",
    id: "bam_aligner",
    description: "This tool isn't as cool as the other one but I still think it's ok",
    configuration: [
        {
            min: 1,
            default: 50,
            description: "Minimum accepted quality",
            name: "accepted_qual_limit",
            type: "int"
        }
    ],
    inputs: [
        {
            name: "in_bam_file",
            format: "bam"
        }
    ],
    outputs: [
        {
            name: "output",
            format: "html"
        }
    ]
};