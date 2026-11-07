import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';

interface SubjectSection {
  name?: string;
  topics: { num: number; title: string }[];
}

interface LevelData {
  id: string;
  title: string;
  sections: SubjectSection[];
}

const ROADMAP_DATA: LevelData[] = [
  {
    id: 'level-1',
    title: 'LEVEL 1: EARLY CHILDHOOD & PRE-PRIMARY (Play Group, Nursery, Prep / KG — Ages 3 to 5)',
    sections: [
      {
        name: 'EARLY MATHEMATICS & NUMERACY',
        topics: [
          { num: 1, title: 'Shapes & Colors Sorter' },
          { num: 2, title: 'Counting Fun 1 to 10 with Real Animated Objects' },
          { num: 3, title: 'Numbers Counting 11 to 20' },
          { num: 4, title: 'Missing Numbers on Number Line' },
          { num: 5, title: 'Number Comparison: More, Less, and Equal' },
          { num: 6, title: '2D Basic Shapes Identification (Circle, Square, Triangle, Rectangle, Star)' },
          { num: 7, title: '3D Real-World Shapes Explorer (Ball, Box, Can, Cone)' },
          { num: 8, title: 'Primary & Secondary Colors Palette' },
          { num: 9, title: 'Color Mixing Lab (Red + Blue = Purple, Yellow + Blue = Green)' },
          { num: 10, title: 'Big vs Small Comparison' },
          { num: 11, title: 'Long vs Short Comparison' },
          { num: 12, title: 'Heavy vs Light Comparison' },
          { num: 13, title: 'Tall vs Short Comparison' },
          { num: 14, title: 'Spatial Prepositions: Inside vs Outside, Above vs Below, Near vs Far' },
          { num: 15, title: 'Repeating Patterns (AB, AAB, ABC Patterns)' },
          { num: 16, title: 'Object Sorting by Size and Color' },
          { num: 17, title: 'Number Tracing 1 to 10' },
          { num: 18, title: 'Dice Dot Counting & Dominoes' },
          { num: 19, title: 'Object Pair Matching' },
          { num: 20, title: 'Simple Visual Picture Addition (Sums up to 10)' },
          { num: 21, title: 'Simple Visual Picture Subtraction (Take Away up to 10)' }
        ]
      },
      {
        name: 'ENGLISH LANGUAGE & PHONICS',
        topics: [
          { num: 22, title: 'Alphabet Adventure: A to Z Letter Recognition' },
          { num: 23, title: 'Phonics Letter Sounds (a to z)' },
          { num: 24, title: 'Uppercase and Lowercase Letter Matching' },
          { num: 25, title: 'Interactive Alphabet Tracing (A to Z)' },
          { num: 26, title: 'Beginning Sound Identification' },
          { num: 27, title: 'CVC 3-Letter Word Blending (cat, dog, sun, bat, pen)' },
          { num: 28, title: 'Sight Words for Beginners' },
          { num: 29, title: 'Rhyming Words Playground' },
          { num: 30, title: 'Farm and Wild Animals Vocabulary' },
          { num: 31, title: 'Fruits & Vegetables Basket Vocabulary' },
          { num: 32, title: 'Classroom & School Objects Vocabulary' },
          { num: 33, title: 'Family Members Vocabulary' },
          { num: 34, title: 'Action Verbs Visualizer (run, jump, sleep, read, eat)' },
          { num: 35, title: 'Opposites Sorter (hot/cold, fast/slow, happy/sad)' },
          { num: 36, title: 'Simple Story Picture Sequencing' }
        ]
      },
      {
        name: 'URDU LANGUAGE & HAROOF-E-TAHAJJI (اردو حروفِ تہجی و بنیادی ذخیرہ الفاظ)',
        topics: [
          { num: 37, title: 'حروفِ تہجی کی تصویری پہچان (الف تا ے)' },
          { num: 38, title: 'حروفِ تہجی کی صوتی آوازیں (Urdu Phonics)' },
          { num: 39, title: 'حروفِ تہجی ٹریسنگ لیب' },
          { num: 40, title: 'ابتدائی تصویری الفاظ (الف سے انار، ب سے بلی، پ سے پنکھا)' },
          { num: 41, title: 'دو حرفی جوڑ (اب، رب، دس، دن، پل)' },
          { num: 42, title: 'بنیادی رنگوں کے اردو نام' },
          { num: 43, title: 'پھلوں اور سبزیوں کے اردو نام' },
          { num: 44, title: 'جسم کے اعضاء کے اردو نام' },
          { num: 45, title: 'پالتو اور جنگلی جانوروں کی پہچان' },
          { num: 46, title: 'اردو گنتی تصویری فلیش کارڈز (۱ تا ۱۰)' }
        ]
      },
      {
        name: 'GENERAL KNOWLEDGE & SCIENCE DISCOVERY',
        topics: [
          { num: 47, title: 'The Five Senses Lab (Sight, Hearing, Touch, Taste, Smell)' },
          { num: 48, title: 'My Body Parts & Functions' },
          { num: 49, title: 'Animal Sounds & Homes (Barn, Nest, Den, Pond, Hive)' },
          { num: 50, title: 'Wild vs Domestic Animals Classification' },
          { num: 51, title: 'Living vs Non-Living Sorter' },
          { num: 52, title: 'Day and Night Sky Slider' },
          { num: 53, title: 'Weather Basics (Sunny, Rainy, Cloudy, Windy, Snowy)' },
          { num: 54, title: 'Parts of a Plant (Roots, Stem, Leaves, Flower)' },
          { num: 55, title: 'Seed Germination & Growth' },
          { num: 56, title: 'Healthy Habits: Handwashing, Brushing Teeth, Hygiene' },
          { num: 57, title: 'Water in Our Daily Life' },
          { num: 58, title: 'Seasons of the Year' },
          { num: 59, title: 'Traffic Lights & Road Safety Rules' },
          { num: 60, title: 'Community Helpers (Doctor, Teacher, Police, Firefighter)' }
        ]
      }
    ]
  },
  {
    id: 'level-2',
    title: 'LEVEL 2: LOWER PRIMARY (Class 1 & Class 2 — Ages 6 to 7)',
    sections: [
      {
        name: 'MATHEMATICS',
        topics: [
          { num: 1, title: 'Place Value Blocks: Tens and Ones' },
          { num: 2, title: 'Numbers up to 100 on Interactive Hundred Chart' },
          { num: 3, title: 'Number Comparison using Symbols (<, >, =)' },
          { num: 4, title: 'Forward & Backward Counting to 100' },
          { num: 5, title: 'Skip Counting by 2s, 5s, and 10s' },
          { num: 6, title: 'Addition of 1-Digit and 2-Digit Numbers without Regrouping' },
          { num: 7, title: 'Addition of 2-Digit Numbers with Carrying / Regrouping' },
          { num: 8, title: 'Subtraction of 2-Digit Numbers without Borrowing' },
          { num: 9, title: 'Subtraction of 2-Digit Numbers with Borrowing / Regrouping' },
          { num: 10, title: 'Number Bonds to 10 and 20' },
          { num: 11, title: 'Ordinal Numbers (1st to 10th)' },
          { num: 12, title: 'Even and Odd Numbers Visualizer' },
          { num: 13, title: 'Analog Clock Reading (o\'clock and half-past)' },
          { num: 14, title: 'Digital Clock and AM/PM Routines' },
          { num: 15, title: 'Pakistani Currency Shopping Simulator (Rs 1, 2, 5, 10, 20, 50, 100)' },
          { num: 16, title: 'Length Measurement with Virtual Centimeter Ruler' },
          { num: 17, title: 'Weight Comparison using Balance Scale' },
          { num: 18, title: 'Capacity Measurement (Cups, Glasses, Liters)' },
          { num: 19, title: '2D Shapes Properties (Sides, Vertices, Straight & Curved Lines)' },
          { num: 20, title: '3D Solid Shapes Properties (Cube, Sphere, Cylinder, Cone)' },
          { num: 21, title: 'Pictographs and Simple Bar Graphs Reader' },
          { num: 22, title: 'Multiplication Foundations: Repeated Addition on Number Line' },
          { num: 23, title: 'Division Foundations: Equal Sharing and Grouping' }
        ]
      },
      {
        name: 'GENERAL SCIENCE',
        topics: [
          { num: 24, title: 'Living Things and Their Basic Needs (Food, Water, Air, Shelter)' },
          { num: 25, title: 'Plant Life Cycle from Seed to Seedling to Mature Plant' },
          { num: 26, title: 'Types of Plants (Trees, Shrubs, Herbs, Climbers)' },
          { num: 27, title: 'Herbivores, Carnivores, and Omnivores Animal Sorter' },
          { num: 28, title: 'Animal Body Coverings (Fur, Feathers, Scales, Shell)' },
          { num: 29, title: 'Human Skeleton & Movement Basics' },
          { num: 30, title: 'Healthy Diet Plate & Food Groups' },
          { num: 31, title: 'Solid, Liquid, and Gas Everyday Examples' },
          { num: 32, title: 'Natural vs Artificial Light Sources' },
          { num: 33, title: 'Shadow Formation and Movement with Torch Light' },
          { num: 34, title: 'Sound Sources, Loudness, and Vibration' },
          { num: 35, title: 'Magnets Attraction and Repulsion Poles' },
          { num: 36, title: 'Push and Pull Forces in Daily Life' },
          { num: 37, title: 'Daily Weather Station & Seasons Calendar' },
          { num: 38, title: 'Soil Types (Sand, Clay, Loam)' },
          { num: 39, title: 'Sun as Source of Heat and Light for Earth' },
          { num: 40, title: 'Water Bodies: Rivers, Lakes, Seas, and Oceans' }
        ]
      },
      {
        name: 'ENGLISH & URDU LANGUAGE',
        topics: [
          { num: 41, title: 'Common and Proper Nouns Sorter' },
          { num: 42, title: 'Singular and Plural Nouns (-s, -es)' },
          { num: 43, title: 'Pronouns Explorer (he, she, it, they, we, you)' },
          { num: 44, title: 'Action Verbs and Simple Present/Past Tenses' },
          { num: 45, title: 'Describing Words (Adjectives) Lab' },
          { num: 46, title: 'Prepositions (in, on, under, behind, next to)' },
          { num: 47, title: 'Capital Letters, Full Stops, and Question Marks' },
          { num: 48, title: 'اردو حروف کی مکمل اور آدھی اشکال' },
          { num: 49, title: 'تین اور چار حرفی الفاظ کی بناوٹ' },
          { num: 50, title: 'اسم، فعل اور صفت کی ابتدائی پہچان' },
          { num: 51, title: 'واحد اور جمع (واحد سے جمع بنانا)' },
          { num: 52, title: 'مذکر اور مؤنث کی جوڑیاں' },
          { num: 53, title: 'الفاظ متضاد اور مترادف' },
          { num: 54, title: 'اردو جملوں کی درست ترتیب' }
        ]
      }
    ]
  },
  {
    id: 'level-3',
    title: 'LEVEL 3: UPPER PRIMARY (Class 3, Class 4 & Class 5 — Ages 8 to 10)',
    sections: [
      {
        name: 'MATHEMATICS',
        topics: [
          { num: 1, title: 'Numbers up to 100,000 and 1,000,000 with Place Value Charts' },
          { num: 2, title: 'Expanded Form and Number Names' },
          { num: 3, title: 'Rounding Numbers to Nearest 10, 100, and 1,000' },
          { num: 4, title: 'Roman Numerals (I to C)' },
          { num: 5, title: 'Addition & Subtraction of 4-Digit and 5-Digit Numbers' },
          { num: 6, title: 'Multiplication Tables Visualizer (1 to 20)' },
          { num: 7, title: 'Multi-Digit Multiplication (2-Digit by 2-Digit, 3-Digit by 2-Digit)' },
          { num: 8, title: 'Long Division with Quotients and Remainders' },
          { num: 9, title: 'Factors, Multiples, and Divisibility Rules (2, 3, 5, 9, 10)' },
          { num: 10, title: 'Prime and Composite Numbers Sieve of Eratosthenes' },
          { num: 11, title: 'Highest Common Factor (HCF / GCF) by Prime Factorization' },
          { num: 12, title: 'Least Common Multiple (LCM) by Division Method' },
          { num: 13, title: 'Fractions Visualizer: Proper, Improper, and Mixed Fractions' },
          { num: 14, title: 'Fractions Pizza and Bar Models' },
          { num: 15, title: 'Equivalent Fractions and Fraction Simplification' },
          { num: 16, title: 'Addition and Subtraction of Like and Unlike Fractions' },
          { num: 17, title: 'Multiplication and Division of Fractions' },
          { num: 18, title: 'Decimals Representation on Tenths and Hundredths Grids' },
          { num: 19, title: 'Conversion Between Fractions, Decimals, and Percentages' },
          { num: 20, title: 'Addition and Subtraction of Decimal Numbers' },
          { num: 21, title: 'Percentage Calculations and Real-Life Problems' },
          { num: 22, title: 'Order of Operations (BODMAS / PEMDAS)' },
          { num: 23, title: 'Metric Units Conversion (mm, cm, m, km)' },
          { num: 24, title: 'Mass Conversion (g, kg) and Capacity Conversion (mL, L)' },
          { num: 25, title: 'Time Interval Calculations (Hours, Minutes, Seconds, 12-Hour vs 24-Hour Time)' },
          { num: 26, title: 'Pakistani Currency Multi-Step Financial Word Problems' },
          { num: 27, title: 'Angles Measurement with Virtual Protractor (Acute, Right, Obtuse, Reflex, Straight)' },
          { num: 28, title: 'Parallel, Perpendicular, and Intersecting Lines' },
          { num: 29, title: 'Triangles Classification by Sides and Angles' },
          { num: 30, title: 'Quadrilaterals Explorer (Square, Rectangle, Parallelogram, Rhombus, Trapezoid)' },
          { num: 31, title: 'Perimeter and Area of Rectangles, Squares, and Compound Shapes' },
          { num: 32, title: 'Volume of Cubes and Cuboids using Unit Cubes' },
          { num: 33, title: 'Symmetry Lines and Rotational Symmetry' },
          { num: 34, title: 'Cartesian Coordinate Grid (First Quadrant)' },
          { num: 35, title: 'Bar Graphs, Double Bar Graphs, and Pictographs Lab' },
          { num: 36, title: 'Line Graphs and Trends Interpretation' },
          { num: 37, title: 'Average and Mean Calculation Lab' }
        ]
      },
      {
        name: 'GENERAL SCIENCE',
        topics: [
          { num: 38, title: 'Plant Organs & Internal Structures' },
          { num: 39, title: 'Photosynthesis Laboratory Engine' },
          { num: 40, title: 'Flower Anatomy, Pollination, and Fertilization' },
          { num: 41, title: 'Seed Dispersal Mechanisms (Wind, Water, Animal, Explosive)' },
          { num: 42, title: 'Life Cycles Comparison: Butterfly, Frog, and Flowering Plant' },
          { num: 43, title: 'Animal Adaptations in Desert, Polar, Aquatic, and Forest Biomes' },
          { num: 44, title: 'Food Chains, Trophic Levels, Producers, and Consumers' },
          { num: 45, title: 'Food Web Builder and Ecosystem Balance Simulator' },
          { num: 46, title: 'Human Digestive System Step-by-Step' },
          { num: 47, title: 'Human Respiratory System & Diaphragm Mechanics' },
          { num: 48, title: 'Human Circulatory System & Pulse Rate Experiment' },
          { num: 49, title: 'Human Skeletal & Muscular Movement Engine' },
          { num: 50, title: 'Microorganisms: Bacteria, Viruses, and Fungi' },
          { num: 51, title: 'Infectious Diseases, Hygiene, and Vaccines' },
          { num: 52, title: 'States of Matter Particle Kinetic Model (Solid, Liquid, Gas)' },
          { num: 53, title: 'Melting, Freezing, Boiling, Evaporation, and Condensation' },
          { num: 54, title: 'The Water Cycle Interactive Simulator' },
          { num: 55, title: 'Physical vs Chemical Changes Laboratory' },
          { num: 56, title: 'Solutions, Solutes, Solvents, and Solubility Curves' },
          { num: 57, title: 'Mixture Separation Methods (Filtration, Sieving, Evaporation, Decantation)' },
          { num: 58, title: 'Forces in Action: Gravity, Friction, Air Resistance' },
          { num: 59, title: 'Balanced and Unbalanced Forces Dynamics' },
          { num: 60, title: 'Simple Machines: Levers (Class 1, 2, 3)' },
          { num: 61, title: 'Simple Machines: Fixed and Movable Pulleys' },
          { num: 62, title: 'Simple Machines: Inclined Plane, Wheel & Axle, Wedge, Screw' },
          { num: 63, title: 'Forms of Energy and Energy Transformations' },
          { num: 64, title: 'Sound Waves Propagation through Solids, Liquids, and Gases' },
          { num: 65, title: 'Pitch and Loudness Oscilloscope' },
          { num: 66, title: 'Light Rays Reflection and Plane Mirror Image Formation' },
          { num: 67, title: 'Light Refraction through Water and Glass Blocks' },
          { num: 68, title: 'Shadow Formation, Solar Eclipse, and Lunar Eclipse' },
          { num: 69, title: 'Static Electricity and Simple Circuits Builder' },
          { num: 70, title: 'Conductors and Insulators Testing Lab' },
          { num: 71, title: 'Permanent Magnets and Electromagnets Builder' },
          { num: 72, title: 'Earth Interior Layers (Crust, Mantle, Outer Core, Inner Core)' },
          { num: 73, title: 'Soil Layers, Soil Types, and Soil Erosion' },
          { num: 74, title: 'Rocks Classification (Igneous, Sedimentary, Metamorphic)' },
          { num: 75, title: 'Earth Rotation (Day & Night) and Revolution (Seasons)' },
          { num: 76, title: 'Moon Phases and Tidal Dynamics' },
          { num: 77, title: 'Solar System 8 Planets Scale Explorer' },
          { num: 78, title: 'Weather Instruments (Thermometer, Barometer, Rain Gauge, Anemometer)' },
          { num: 79, title: 'Renewable and Non-Renewable Energy Resources' },
          { num: 80, title: 'Environmental Pollution and 3Rs (Reduce, Reuse, Recycle)' }
        ]
      },
      {
        name: 'SOCIAL STUDIES & PAKISTAN GEOGRAPHY',
        topics: [
          { num: 81, title: 'Provinces and Administrative Territories of Pakistan' },
          { num: 82, title: 'Mountain Ranges of Pakistan (Himalayas, Karakoram, Hindu Kush)' },
          { num: 83, title: 'The Indus River Basin and River Tributaries' },
          { num: 84, title: 'Deserts of Pakistan (Thar, Cholistan, Thal, Kharan)' },
          { num: 85, title: 'Climate Zones and Agriculture of Pakistan' },
          { num: 86, title: 'Indus Valley Civilization: Mohenjo-daro & Harappa' },
          { num: 87, title: 'Pakistan Movement Leaders and Historic Milestones' },
          { num: 88, title: 'National Symbols, Heritage, and Constitution of Pakistan' },
          { num: 89, title: 'World Continents and Oceans Interactive Atlas' }
        ]
      },
      {
        name: 'COMPUTER SCIENCE & DIGITAL LITERACY',
        topics: [
          { num: 90, title: 'Computer Hardware Components (Input, Output, Storage, System Unit)' },
          { num: 91, title: 'CPU Architecture, Registers, and RAM' },
          { num: 92, title: 'Keyboard Shortcuts & Typing Ergonomics' },
          { num: 93, title: 'Operating System GUI & File Management' },
          { num: 94, title: 'Algorithm Design & Flowcharting Basics' },
          { num: 95, title: 'Block-Based Coding Visual Playground (Scratch-Style)' },
          { num: 96, title: 'Internet Safety, Web Browsers, and Search Engines' }
        ]
      }
    ]
  },
  {
    id: 'level-4',
    title: 'LEVEL 4: MIDDLE SCHOOL (Class 6, Class 7 & Class 8 — Ages 11 to 14)',
    sections: [
      {
        name: 'GENERAL SCIENCE: BIOLOGY & LIFE SCIENCES',
        topics: [
          { num: 1, title: 'Cell Theory and Microscopic Organization' },
          { num: 2, title: 'Plant Cell vs Animal Cell 3D Ultrastructure' },
          { num: 3, title: 'Cell Organelles: Nucleus, Mitochondria, Chloroplast, Vacuoles' },
          { num: 4, title: 'Cell, Tissue, Organ, and Organ System Hierarchy' },
          { num: 5, title: 'Microscopic Organisms: Amoeba, Paramecium, Euglena' },
          { num: 6, title: 'Virtual Microscope Simulation (4x, 10x, 40x Magnifications)' },
          { num: 7, title: 'Photosynthesis Rate vs Light Intensity, CO2, and Temperature' },
          { num: 8, title: 'Plant Transpiration & Stomatal Mechanics' },
          { num: 9, title: 'Xylem and Phloem Transport in Plants' },
          { num: 10, title: 'Human Digestive System Anatomy and Enzyme Reactions' },
          { num: 11, title: 'Human Respiratory System, Diaphragm, and Alveolar Gas Exchange' },
          { num: 12, title: 'Human Circulatory System, Heart Chambers, and Blood Flow' },
          { num: 13, title: 'Human Eye Optics and Vision Mechanics' },
          { num: 14, title: 'Human Ear Structure and Auditory Mechanism' },
          { num: 15, title: 'Reproduction in Flowering Plants (Pollination & Fertilization)' },
          { num: 16, title: 'Ecological Pyramids, Habitat Conservation, and Biodiversity' }
        ]
      },
      {
        name: 'GENERAL SCIENCE: CHEMISTRY & MATTER',
        topics: [
          { num: 17, title: 'Atoms, Molecules, Elements, and Compounds' },
          { num: 18, title: 'Chemical Symbols and Periodic Table First 20 Elements' },
          { num: 19, title: 'Atomic Structure: Protons, Neutrons, and Electrons' },
          { num: 20, title: 'Atomic Number, Mass Number, and Isotopes' },
          { num: 21, title: 'Chemical Formulae Writing and Equation Balancing' },
          { num: 22, title: 'Physical vs Chemical Changes with Energy Evidence' },
          { num: 23, title: 'Solutions, Suspensions, and Colloids Comparison' },
          { num: 24, title: 'Separation Techniques: Filtration, Crystallization, Simple Distillation' },
          { num: 25, title: 'Paper Chromatography Laboratory' },
          { num: 26, title: 'Acids, Bases, and Universal pH Scale' },
          { num: 27, title: 'Litmus Paper and Chemical Indicators' },
          { num: 28, title: 'Acid-Base Neutralization Reactions' },
          { num: 29, title: 'Water Purification and Filtration Plant' },
          { num: 30, title: 'Composition of Air and Atmospheric Layers' },
          { num: 31, title: 'Rusting of Iron and Corrosion Prevention Techniques' }
        ]
      },
      {
        name: 'GENERAL SCIENCE: PHYSICS & PHYSICAL PHENOMENA',
        topics: [
          { num: 32, title: 'Distance, Displacement, Speed, and Velocity' },
          { num: 33, title: 'Acceleration and Distance-Time Motion Graphs' },
          { num: 34, title: 'Newton\'s First Law of Motion and Inertia' },
          { num: 35, title: 'Newton\'s Second Law of Motion (F = ma)' },
          { num: 36, title: 'Newton\'s Third Law of Motion (Action and Reaction)' },
          { num: 37, title: 'Contact vs Non-Contact Forces' },
          { num: 38, title: 'Friction on Various Surfaces and Lubrication' },
          { num: 39, title: 'Pressure in Solids, Liquids, and Gases (P = F/A)' },
          { num: 40, title: 'Atmospheric Pressure and Mercury Barometer' },
          { num: 41, title: 'Pascal\'s Principle & Hydraulic Lift Engine' },
          { num: 42, title: 'Work, Kinetic Energy, and Gravitational Potential Energy' },
          { num: 43, title: 'Conservation of Mechanical Energy' },
          { num: 44, title: 'Thermal Energy, Temperature Scales (°C, °F, K)' },
          { num: 45, title: 'Heat Transfer: Conduction, Convection, Radiation' },
          { num: 46, title: 'Thermal Expansion in Solids, Liquids, and Gases' },
          { num: 47, title: 'Sound Wave Frequency, Wavelength, Amplitude, and Speed' },
          { num: 48, title: 'Human Audible Frequency Range and Ultrasound' },
          { num: 49, title: 'Light Reflection and Laws of Reflection' },
          { num: 50, title: 'Image Formation by Plane, Concave, and Convex Mirrors' },
          { num: 51, title: 'Light Refraction, Critical Angle, and Total Internal Reflection' },
          { num: 52, title: 'Light Dispersion through Triangular Glass Prism (VIBGYOR)' },
          { num: 53, title: 'Series and Parallel Circuits: Current and Voltage Measurements' },
          { num: 54, title: 'Electrical Safety: Fuses, Circuit Breakers, and Earthing' },
          { num: 55, title: 'Magnetic Fields around Bar Magnets and Electromagnets' }
        ]
      },
      {
        name: 'GENERAL SCIENCE: EARTH & SPACE SCIENCES',
        topics: [
          { num: 56, title: 'Continental Drift and Plate Tectonics Engine' },
          { num: 57, title: 'Earthquake Seismology and Richter Scale' },
          { num: 58, title: 'Volcanic Eruptions and Magma Dynamics' },
          { num: 59, title: 'The Rock Cycle: Igneous, Sedimentary, Metamorphic' },
          { num: 60, title: 'Solar System Orbits and Keplerian Planetary Motion' },
          { num: 61, title: 'Solar and Lunar Eclipses 3D Geometry' },
          { num: 62, title: 'Artificial Satellites and Space Exploration' }
        ]
      },
      {
        name: 'MATHEMATICS',
        topics: [
          { num: 63, title: 'Sets Theory: Union, Intersection, Universal Set, Venn Diagrams' },
          { num: 64, title: 'Integers Arithmetic on Number Line' },
          { num: 65, title: 'Rational Numbers Operations' },
          { num: 66, title: 'Square Roots and Cube Roots (Factorization and Division Methods)' },
          { num: 67, title: 'Real Number System Properties' },
          { num: 68, title: 'Ratio, Proportion, and Direct/Inverse Variation' },
          { num: 69, title: 'Financial Math: Profit, Loss, Discount, and GST' },
          { num: 70, title: 'Zakat and Ushr Calculations' },
          { num: 71, title: 'Simple Interest and Compound Interest Formulas' },
          { num: 72, title: 'Algebraic Expressions, Terms, Variables, and Degrees' },
          { num: 73, title: 'Polynomials Addition, Subtraction, Multiplication, Division' },
          { num: 74, title: 'Algebraic Identities: (a+b)², (a-b)², a²-b²' },
          { num: 75, title: 'Factorization of Quadratic Polynomials by Middle Term Breaking' },
          { num: 76, title: 'Linear Equations in One Variable with Brackets and Fractions' },
          { num: 77, title: 'Linear Inequalities in One Variable on Number Line' },
          { num: 78, title: 'Simultaneous Linear Equations in Two Variables' },
          { num: 79, title: 'Parallel Lines, Transversals, Alternate and Corresponding Angles' },
          { num: 80, title: 'Triangles Congruency Criteria (SSS, SAS, ASA, RHS)' },
          { num: 81, title: 'Pythagoras Theorem Proofs and Applications' },
          { num: 82, title: 'Circle Theorems: Radius, Diameter, Chords, Tangents' },
          { num: 83, title: 'Area and Perimeter of Triangles, Parallelograms, Trapezoids' },
          { num: 84, title: 'Surface Area and Volume of Cylinders, Prisms, and Spheres' },
          { num: 85, title: 'Cartesian Coordinate Plane and Linear Graphs Plotting' },
          { num: 86, title: 'Frequency Distribution Tables and Histograms' },
          { num: 87, title: 'Mean, Median, Mode, and Range for Ungrouped/Grouped Data' },
          { num: 88, title: 'Probability: Spinners, Dice, and Coin Toss Experiments' }
        ]
      },
      {
        name: 'COMPUTER SCIENCE',
        topics: [
          { num: 89, title: 'Number Systems: Decimal, Binary, Octal, Hexadecimal' },
          { num: 90, title: 'Binary Number Arithmetic (Addition & Subtraction)' },
          { num: 91, title: 'Logic Gates: AND, OR, NOT, NAND, NOR Truth Tables' },
          { num: 92, title: 'Algorithm Design, Flowcharts, and Pseudocode' },
          { num: 93, title: 'Python Programming Basics: Variables, Data Types, Input/Output' },
          { num: 94, title: 'Python Conditional Statements (if, if-else, elif)' },
          { num: 95, title: 'Python Loops (for loops, while loops)' },
          { num: 96, title: 'Computer Hardware Architecture: CPU, ALU, Registers, Cache' },
          { num: 97, title: 'Computer Networks: LAN, WAN, MAN, Network Topologies' },
          { num: 98, title: 'Internet Protocols: HTTP, HTTPS, TCP/IP, IP Addressing' },
          { num: 99, title: 'Cybersecurity: Malware, Firewalls, Passwords, Safe Browsing' }
        ]
      }
    ]
  },
  {
    id: 'level-5',
    title: 'LEVEL 5: SECONDARY / MATRICULATION (Class 9 & Class 10 — Ages 14 to 16)',
    sections: [
      {
        name: 'PHYSICS (CLASS 9 & 10)',
        topics: [
          { num: 1, title: 'Physical Quantities, SI Units, and Standard Form' },
          { num: 2, title: 'Vernier Calipers & Micrometer Screw Gauge Simulator' },
          { num: 3, title: 'Scalars and Vectors Dynamics' },
          { num: 4, title: 'Kinematics Equations of Uniformly Accelerated Motion' },
          { num: 5, title: 'Velocity-Time and Distance-Time Motion Graphs Analysis' },
          { num: 6, title: 'Newton\'s First, Second, and Third Laws of Motion' },
          { num: 7, title: 'Linear Momentum and Law of Conservation of Momentum' },
          { num: 8, title: 'Friction, Centripetal Force, and Banking of Roads' },
          { num: 9, title: 'Torque, Center of Gravity, and Equilibrium States' },
          { num: 10, title: 'Newton\'s Law of Universal Gravitation and Mass of Earth' },
          { num: 11, title: 'Gravitational Field Strength Variation with Altitude' },
          { num: 12, title: 'Artificial Satellites and Orbital Velocity' },
          { num: 13, title: 'Work, Kinetic Energy, and Gravitational Potential Energy' },
          { num: 14, title: 'Interconversion of Energy and Efficiency Calculations' },
          { num: 15, title: 'Power and Work Rates' },
          { num: 16, title: 'Kinetic Molecular Model of Matter and Density' },
          { num: 17, title: 'Pressure in Fluids, Pascal\'s Principle, and Hydraulic Lift' },
          { num: 18, title: 'Archimedes\' Principle of Flotation and Upthrust' },
          { num: 19, title: 'Hooke\'s Law, Elasticity, and Young\'s Modulus' },
          { num: 20, title: 'Thermal Properties: Temperature Scales, Specific Heat Capacity' },
          { num: 21, title: 'Latent Heat of Fusion and Latent Heat of Vaporization' },
          { num: 22, title: 'Modes of Heat Transfer: Conduction, Convection, Radiation' },
          { num: 23, title: 'Simple Harmonic Motion: Mass-Spring System & Simple Pendulum' },
          { num: 24, title: 'Wave Motion: Transverse vs Longitudinal Waves' },
          { num: 25, title: 'Wave Equation (v = fλ) and Ripple Tank Experiments' },
          { num: 26, title: 'Sound Waves: Pitch, Quality, Loudness, Decibel Scale' },
          { num: 27, title: 'Speed of Sound by Resonance Tube Method' },
          { num: 28, title: 'Ultrasound and Medical Imaging Applications' },
          { num: 29, title: 'Reflection of Light: Concave and Convex Spherical Mirrors' },
          { num: 30, title: 'Mirror Formula and Image Magnification' },
          { num: 31, title: 'Refraction of Light, Snell\'s Law, and Refractive Index' },
          { num: 32, title: 'Total Internal Reflection, Critical Angle, Optical Fibers' },
          { num: 33, title: 'Lenses Ray Diagrams: Convex and Concave Lenses' },
          { num: 34, title: 'Thin Lens Formula and Optical Power of Lenses' },
          { num: 35, title: 'Optical Instruments: Compound Microscope and Astronomical Telescope' },
          { num: 36, title: 'Human Eye Optics and Vision Defects Correction' },
          { num: 37, title: 'Electrostatics: Coulomb\'s Law and Electric Field Intensity' },
          { num: 38, title: 'Electric Potential, Potential Difference, and Equipotential Surfaces' },
          { num: 39, title: 'Capacitors: Capacitance, Series and Parallel Circuits' },
          { num: 40, title: 'Ohm\'s Law, Ohmic vs Non-Ohmic Conductors, and Resistivity' },
          { num: 41, title: 'Series and Parallel Resistor Combinations' },
          { num: 42, title: 'Electromotive Force (EMF), Internal Resistance, Joule\'s Law' },
          { num: 43, title: 'Magnetic Effect of Current and Fleming\'s Left-Hand Rule' },
          { num: 44, title: 'DC Motor Mechanism and Split-Ring Commutator' },
          { num: 45, title: 'Electromagnetic Induction: Faraday\'s Law and Lenz\'s Law' },
          { num: 46, title: 'AC Generator and Transformer (Step-Up / Step-Down)' },
          { num: 47, title: 'Thermionic Emission and Cathode Rays' },
          { num: 48, title: 'Digital Electronics: AND, OR, NOT, NAND, NOR, XOR Gates' },
          { num: 49, title: 'Information and Communication Technology (ICT) Systems' },
          { num: 50, title: 'Atomic Models: Rutherford and Bohr Atomic Models' },
          { num: 51, title: 'Atomic Number, Mass Number, and Isotopes' },
          { num: 52, title: 'Natural Radioactivity: Alpha, Beta, and Gamma Emissions' },
          { num: 53, title: 'Half-Life Calculations and Radioactive Decay Curves' },
          { num: 54, title: 'Nuclear Fission and Nuclear Fusion Chain Reactions' },
          { num: 55, title: 'Radiation Hazards and Safety Shielding' }
        ]
      },
      {
        name: 'CHEMISTRY (CLASS 9 & 10)',
        topics: [
          { num: 56, title: 'Fundamentals of Chemistry: Elements, Compounds, Mixtures' },
          { num: 57, title: 'Empirical and Molecular Formula Calculations' },
          { num: 58, title: 'Mole Concept, Molar Mass, and Avogadro\'s Number' },
          { num: 59, title: 'Stoichiometric Calculations and Limiting Reactant' },
          { num: 60, title: 'Atomic Structure: Rutherford\'s Gold Foil Experiment' },
          { num: 61, title: 'Bohr\'s Atomic Theory and Orbit Energies' },
          { num: 62, title: 'Electronic Configuration of First 20 Elements (Aufbau Principle)' },
          { num: 63, title: 'Isotopes and Their Industrial / Medical Applications' },
          { num: 64, title: 'Modern Periodic Law and Periodic Table Periods & Groups' },
          { num: 65, title: 'Periodic Trends: Atomic Radius, Ionic Radius, Ionization Energy' },
          { num: 66, title: 'Periodic Trends: Electron Affinity and Electronegativity' },
          { num: 67, title: 'Ionic Bond Formation (NaCl, MgO, MgCl2)' },
          { num: 68, title: 'Covalent Bond Formation (Single, Double, Triple Bonds)' },
          { num: 69, title: 'Coordinate Covalent (Dative) Bond Formation' },
          { num: 70, title: 'Metallic Bonding and Electron Sea Model' },
          { num: 71, title: 'Intermolecular Forces: Dipole-Dipole and Hydrogen Bonding' },
          { num: 72, title: 'Gas Laws: Boyle\'s Law and Charles\'s Law Verification' },
          { num: 73, title: 'Absolute Zero Temperature and Kinetic Gas Theory' },
          { num: 74, title: 'Evaporation, Vapor Pressure, and Boiling Point Dynamics' },
          { num: 75, title: 'Allotropes of Carbon, Sulfur, and Phosphorus' },
          { num: 76, title: 'Solutions: Saturated, Unsaturated, Supersaturated' },
          { num: 77, title: 'Molarity (M) and Percentage Concentration Calculations' },
          { num: 78, title: 'Solubility Curves and Temperature Effect' },
          { num: 79, title: 'Electrochemistry: Oxidation and Reduction in Electron Terms' },
          { num: 80, title: 'Balancing Redox Equations using Oxidation Numbers' },
          { num: 81, title: 'Electrolytic Cell and Industrial Electrolysis (Down\'s Cell, Nelson\'s Cell)' },
          { num: 82, title: 'Galvanic Cell (Daniel Cell) and Standard Electrode Potentials' },
          { num: 83, title: 'Electroplating of Metals (Copper, Silver, Chromium)' },
          { num: 84, title: 'Corrosion of Iron and Cathodic Protection' },
          { num: 85, title: 'Reactivity Series of Metals and Displacement Reactions' },
          { num: 86, title: 'Chemical Equilibrium and Law of Mass Action (Kc Expression)' },
          { num: 87, title: 'Le Chatelier\'s Principle in Chemical Industrial Synthesis' },
          { num: 88, title: 'Arrhenius, Bronsted-Lowry, and Lewis Theories of Acids and Bases' },
          { num: 89, title: 'Auto-Ionization of Water and pH/pOH Scale Calculations' },
          { num: 90, title: 'Acid-Base Titration Laboratory and Neutralization Curves' },
          { num: 91, title: 'Preparation and Properties of Salts' },
          { num: 92, title: 'Organic Chemistry: Functional Groups Classification' },
          { num: 93, title: 'Alkanes: Nomenclature, Halogenation, Combustion' },
          { num: 94, title: 'Alkenes: Preparation, Hydrogenation, Halogenation, Markovnikov Rule' },
          { num: 95, title: 'Alkynes: Ethyne Structure and Reactions' },
          { num: 96, title: 'Biochemistry: Carbohydrates, Proteins, Lipids, Nucleic Acids' },
          { num: 97, title: 'Atmospheric Layers and Air Pollutants (CO, SO2, NOx)' },
          { num: 98, title: 'Acid Rain Formation and Greenhouse Effect' },
          { num: 99, title: 'Ozone Layer Depletion Chemistry and CFCs' },
          { num: 100, title: 'Hard Water vs Soft Water and Water Softening Methods' },
          { num: 101, title: 'Metallurgy of Copper and Blast Furnace' },
          { num: 102, title: 'Solvay\'s Process for Sodium Carbonate Manufacturing' },
          { num: 103, title: 'Urea Synthesis Chemical Manufacturing Flowsheet' },
          { num: 104, title: 'Petroleum Refining and Fractional Distillation Column' }
        ]
      },
      {
        name: 'BIOLOGY (CLASS 9 & 10)',
        topics: [
          { num: 105, title: 'Introduction to Biology and Scientific Problem Solving' },
          { num: 106, title: 'Five Kingdom Classification System' },
          { num: 107, title: 'Binomial Nomenclature Rules' },
          { num: 108, title: 'Cell Structure and Organelles Ultrastructure' },
          { num: 109, title: 'Cell Membrane Transport: Diffusion, Osmosis, Active Transport' },
          { num: 110, title: 'Cell Cycle Phases (Interphase G1, S, G2)' },
          { num: 111, title: 'Mitosis Stages: Prophase, Metaphase, Anaphase, Telophase' },
          { num: 112, title: 'Meiosis I and Meiosis II (Crossing Over & Genetic Variation)' },
          { num: 113, title: 'Enzyme Action Mechanisms: Lock & Key vs Induced Fit' },
          { num: 114, title: 'Factors Affecting Enzyme Activity (Temperature, pH, Concentration)' },
          { num: 115, title: 'Bioenergetics: Photosynthesis Light & Dark Reactions' },
          { num: 116, title: 'Cellular Respiration: Glycolysis, Krebs Cycle, Electron Transport' },
          { num: 117, title: 'Aerobic Respiration vs Anaerobic Fermentation' },
          { num: 118, title: 'Human Digestive System Anatomy and Physiology' },
          { num: 119, title: 'Villi and Nutrient Absorption in Small Intestine' },
          { num: 120, title: 'Transpiration Pull and Cohesion-Tension Theory in Plants' },
          { num: 121, title: 'Food Translocation in Phloem (Pressure Flow Hypothesis)' },
          { num: 122, title: 'Human Heart Anatomy, Chambers, and Double Circulation' },
          { num: 123, title: 'Cardiac Cycle, Blood Pressure, and ECG' },
          { num: 124, title: 'ABO and Rh Blood Group Systems Compatibility' },
          { num: 125, title: 'Cardiovascular Diseases: Atherosclerosis and Infarction' },
          { num: 126, title: 'Human Respiratory System Anatomy and Gas Exchange' },
          { num: 127, title: 'Inhalation vs Exhalation Mechanics' },
          { num: 128, title: 'Respiratory Disorders: Asthma, Bronchitis, Emphysema' },
          { num: 129, title: 'Homeostasis in Plants: Osmoregulation and Stomatal Transpiration' },
          { num: 130, title: 'Human Urinary System and Kidney Anatomy' },
          { num: 131, title: 'Nephron Ultrastructure and Urine Formation Steps' },
          { num: 132, title: 'Kidney Dialysis (Hemodialysis) and Transplantation' },
          { num: 133, title: 'Neuron Anatomy: Dendrites, Axon, Myelin Sheath' },
          { num: 134, title: 'Nerve Impulse Transmission and Synapse' },
          { num: 135, title: 'Human Brain Regions (Forebrain, Midbrain, Hindbrain) and Spinal Cord' },
          { num: 136, title: 'Reflex Arc and Reflex Actions' },
          { num: 137, title: 'Endocrine Glands: Pituitary, Thyroid, Pancreas, Adrenal' },
          { num: 138, title: 'Human Skeleton Divisions (Axial vs Appendicular)' },
          { num: 139, title: 'Joints Classification: Ball-and-Socket, Hinge Joints' },
          { num: 140, title: 'Antagonistic Muscle Action (Biceps and Triceps)' },
          { num: 141, title: 'Asexual vs Sexual Reproduction in Animals' },
          { num: 142, title: 'Reproduction in Plants: Pollination, Double Fertilization, Seeds' },
          { num: 143, title: 'Human Reproductive Anatomy and Menstrual Cycle' },
          { num: 144, title: 'Chromosomes, Genes, and DNA Double Helix' },
          { num: 145, title: 'Mendelian Genetics: Law of Segregation (Monohybrid Cross)' },
          { num: 146, title: 'Mendelian Genetics: Law of Independent Assortment (Dihybrid Cross)' },
          { num: 147, title: 'Co-Dominance and Incomplete Dominance' },
          { num: 148, title: 'Continuous vs Discontinuous Variations' },
          { num: 149, title: 'Natural Selection and Evolution' },
          { num: 150, title: 'Biotechnology: Industrial Fermentation and Fermenters' },
          { num: 151, title: 'Genetic Engineering: Recombinant DNA and Plasmids' },
          { num: 152, title: 'Gene Therapy and Transgenic Organisms' },
          { num: 153, title: 'Ecosystem Components, Food Chains, and Trophic Pyramids' },
          { num: 154, title: 'Biogeochemical Cycles: Carbon and Nitrogen Cycles' },
          { num: 155, title: 'Symbiotic Relationships: Mutualism, Commensalism, Parasitism' },
          { num: 156, title: 'Conservation of Natural Resources in Pakistan' }
        ]
      },
      {
        name: 'MATHEMATICS (CLASS 9 & 10)',
        topics: [
          { num: 157, title: 'Matrices: Types, Addition, Subtraction, Multiplication' },
          { num: 158, title: 'Determinant of 2x2 Matrix and Multiplicative Inverse' },
          { num: 159, title: 'Cramer\'s Rule for Solving Systems of Linear Equations' },
          { num: 160, title: 'Matrix Inversion Method for Linear Systems' },
          { num: 161, title: 'Real and Complex Numbers Properties and Argand Plane' },
          { num: 162, title: 'Radicals, Radicands, and Laws of Exponents' },
          { num: 163, title: 'Operations on Complex Numbers (a + bi)' },
          { num: 164, title: 'Logarithms: Laws of Logarithms, Characteristic, and Mantissa' },
          { num: 165, title: 'Logarithmic Calculations and Scientific Notation' },
          { num: 166, title: 'Algebraic Formulas Evaluation and Simplification' },
          { num: 167, title: 'Factorization of Algebraic Expressions and Polynomials' },
          { num: 168, title: 'HCF and LCM of Algebraic Expressions' },
          { num: 169, title: 'Linear Equations and Absolute Value Equations' },
          { num: 170, title: 'Linear Inequalities in One Variable' },
          { num: 171, title: 'Coordinate Geometry: Distance Formula and Midpoint Formula' },
          { num: 172, title: 'Congruent Triangles Geometric Theorems' },
          { num: 173, title: 'Parallelograms and Triangles Area Theorems' },
          { num: 174, title: 'Right-Angle Bisectors and Angle Bisectors Theorems' },
          { num: 175, title: 'Practical Geometry: Incircle, Circumcircle, and Escribed Circles Construction' },
          { num: 176, title: 'Quadratic Equations: Factorization Method' },
          { num: 177, title: 'Quadratic Equations: Completing Square Method' },
          { num: 178, title: 'Quadratic Equations: Quadratic Formula Derivation and Usage' },
          { num: 179, title: 'Theory of Quadratic Equations: Discriminant (b² - 4ac) and Nature of Roots' },
          { num: 180, title: 'Cube Roots of Unity and Properties (1, ω, ω²)' },
          { num: 181, title: 'Relations Between Roots and Coefficients (Sum & Product of Roots)' },
          { num: 182, title: 'Synthetic Division Method for Polynomial Roots' },
          { num: 183, title: 'Remainder Theorem and Factor Theorem' },
          { num: 184, title: 'Variations: Direct, Inverse, Joint, and Combined Variations' },
          { num: 185, title: 'Theorems on Proportions (Componendo, Dividendo, Invertendo, Alternendo)' },
          { num: 186, title: 'Partial Fractions: Non-Repeated Linear Factors' },
          { num: 187, title: 'Partial Fractions: Repeated Linear Factors' },
          { num: 188, title: 'Partial Fractions: Irreducible Quadratic Factors' },
          { num: 189, title: 'Sets Operations: Union, Intersection, De Morgan\'s Laws' },
          { num: 190, title: 'Binary Relations, Domain, Range, and Functions (1-1, Onto, Bijective)' },
          { num: 191, title: 'Basic Statistics: Frequency Distributions and Cumulative Frequency' },
          { num: 192, title: 'Measures of Central Tendency: Mean, Median, Mode' },
          { num: 193, title: 'Measures of Dispersion: Variance and Standard Deviation' },
          { num: 194, title: 'Trigonometry: Degree vs Radian Measure and Arc Length (s = rθ)' },
          { num: 195, title: 'Area of Circular Sector (A = 1/2 r²θ)' },
          { num: 196, title: 'Trigonometric Ratios on Unit Circle (sin, cos, tan, csc, sec, cot)' },
          { num: 197, title: 'Fundamental Trigonometric Identities (sin²θ + cos²θ = 1, etc.)' },
          { num: 198, title: 'Angles of Elevation and Depression' },
          { num: 199, title: 'Practical Heights and Distances Trigonometry' },
          { num: 200, title: 'Circle Theorems: Chords, Arcs, and Central Angles' },
          { num: 201, title: 'Circle Theorems: Angles in Same Segment and Cyclic Quadrilaterals' },
          { num: 202, title: 'Tangent to Circle Theorems and Tangent Construction' }
        ]
      },
      {
        name: 'COMPUTER SCIENCE (CLASS 9 & 10)',
        topics: [
          { num: 203, title: 'Problem Solving Steps, Flowcharts, and Algorithms' },
          { num: 204, title: 'C Programming Language: Syntax, Structure, Data Types' },
          { num: 205, title: 'C Operators: Arithmetic, Relational, Logical, Assignment' },
          { num: 206, title: 'C Input and Output Functions (printf, scanf, getchar)' },
          { num: 207, title: 'C Decision Control: if, if-else, nested if-else' },
          { num: 208, title: 'C Multiway Branching: switch-case Statement' },
          { num: 209, title: 'C Loop Structures: for Loop, while Loop, do-while Loop' },
          { num: 210, title: 'C Functions: Function Declaration, Definition, Call, and Scope' },
          { num: 211, title: 'C Arrays: 1D Array Declaration, Initialization, Traversal' },
          { num: 212, title: 'HTML5 Web Page Structure, Headings, Paragraphs, Lists' },
          { num: 213, title: 'HTML Tables, Links, and Multimedia Embedding' },
          { num: 214, title: 'HTML Web Forms and Input Fields' },
          { num: 215, title: 'CSS3 Selectors, Styling, Box Model, and Colors' },
          { num: 216, title: 'Cybercrime, Viruses, Antivirus, and Data Encryption' }
        ]
      }
    ]
  },
  {
    id: 'level-6',
    title: 'LEVEL 6: HIGHER SECONDARY / INTERMEDIATE (FSc / ICS / I.Com — Class 11 & 12 — Ages 16 to 18)',
    sections: [
      {
        name: 'PHYSICS (FSc CLASS 11 & 12)',
        topics: [
          { num: 1, title: 'Errors, Uncertainties, and Significant Figures' },
          { num: 2, title: 'Dimensional Analysis and Verification of Physical Equations' },
          { num: 3, title: 'Vectors Addition by Rectangular Components' },
          { num: 4, title: 'Scalar (Dot) Product and Vector (Cross) Product' },
          { num: 5, title: 'Torque and First & Second Conditions of Equilibrium' },
          { num: 6, title: 'Velocity-Time Graphs and Acceleration Derivations' },
          { num: 7, title: 'Newton\'s Laws of Motion in Vector Form' },
          { num: 8, title: 'Linear Momentum and Impulse' },
          { num: 9, title: 'Elastic and Inelastic Collisions in One and Two Dimensions' },
          { num: 10, title: 'Projectile Motion: Trajectory, Time of Flight, Range, Max Height' },
          { num: 11, title: 'Rocket Propulsion Mechanics and Variable Mass Systems' },
          { num: 12, title: 'Work Done by Constant and Variable Forces' },
          { num: 13, title: 'Work-Energy Theorem in Mechanics' },
          { num: 14, title: 'Gravitational Potential Energy and Escape Velocity' },
          { num: 15, title: 'Interconversion of Kinetic and Potential Energy' },
          { num: 16, title: 'Non-Conventional Energy Sources (Tidal, Geothermal, Solar)' },
          { num: 17, title: 'Angular Displacement, Velocity, and Acceleration' },
          { num: 18, title: 'Centripetal Acceleration and Centripetal Force' },
          { num: 19, title: 'Moment of Inertia and Rotational Kinetic Energy' },
          { num: 20, title: 'Angular Momentum and Law of Conservation of Angular Momentum' },
          { num: 21, title: 'Geostationary Orbits and Communication Satellites' },
          { num: 22, title: 'Viscous Drag, Stokes\' Law, and Terminal Velocity' },
          { num: 23, title: 'Fluid Flow: Streamline vs Turbulent Flow' },
          { num: 24, title: 'Equation of Continuity in Fluid Flow' },
          { num: 25, title: 'Bernoulli\'s Equation and Applications (Venturi Meter, Torricelli\'s Law)' },
          { num: 26, title: 'Simple Harmonic Motion Projection from Circular Motion' },
          { num: 27, title: 'Mass-Spring System and Simple Pendulum Oscillations' },
          { num: 28, title: 'Energy Conservation in Simple Harmonic Motion' },
          { num: 29, title: 'Free, Damped, and Driven Oscillations' },
          { num: 30, title: 'Resonance Phenomenon and Tuning Circuits' },
          { num: 31, title: 'Speed of Sound: Newton\'s Formula and Laplace\'s Correction' },
          { num: 32, title: 'Factors Affecting Speed of Sound in Gases' },
          { num: 33, title: 'Superposition Principle and Beats Phenomenon' },
          { num: 34, title: 'Stationary (Standing) Waves in Stretched Strings and Organ Pipes' },
          { num: 35, title: 'Doppler\'s Effect for Sound Waves (Approaching & Receding)' },
          { num: 36, title: 'Wave Optics: Huygens\' Principle of Wavefronts' },
          { num: 37, title: 'Interference of Light: Young\'s Double-Slit Experiment' },
          { num: 38, title: 'Newton\'s Rings and Thin Film Interference' },
          { num: 39, title: 'Michelson Interferometer and Precise Wavelength Measurement' },
          { num: 40, title: 'Diffraction of Light: Single Slit Diffraction Pattern' },
          { num: 41, title: 'Diffraction Grating and Grating Equation (d sinθ = mλ)' },
          { num: 42, title: 'X-Ray Diffraction by Crystals (Bragg\'s Law)' },
          { num: 43, title: 'Polarization of Light: Brewster\'s Law and Polaroids' },
          { num: 44, title: 'Optical Instruments: Compound Microscope and Telescope Magnification' },
          { num: 45, title: 'Spectrometer Structure and Angle of Minimum Deviation' },
          { num: 46, title: 'Fiber Optics: Step-Index and Graded-Index Optical Fibers' },
          { num: 47, title: 'Thermodynamics: First Law of Thermodynamics (ΔU = Q - W)' },
          { num: 48, title: 'Molar Specific Heats of Gas (Cp - Cv = R)' },
          { num: 49, title: 'Isothermal, Adiabatic, Isobaric, and Isochoric Processes' },
          { num: 50, title: 'Second Law of Thermodynamics (Kelvin & Clausius Formulations)' },
          { num: 51, title: 'Carnot Cycle and Maximum Heat Engine Efficiency' },
          { num: 52, title: 'Absolute Thermodynamic Temperature Scale and Entropy (ΔS = Q/T)' },
          { num: 53, title: 'Coulomb\'s Law in Vector Form and Dielectrics Effect' },
          { num: 54, title: 'Electric Field Lines and Electric Field Intensity' },
          { num: 55, title: 'Electric Flux and Gauss\'s Law Three Classic Applications' },
          { num: 56, title: 'Electric Potential, Potential Gradient, and Equipotential Surfaces' },
          { num: 57, title: 'Millikan\'s Oil Drop Experiment for Electron Charge Determination' },
          { num: 58, title: 'Capacitance of Parallel Plate Capacitor with Dielectrics' },
          { num: 59, title: 'Energy Stored in Capacitor Electric Field (1/2 CV²)' },
          { num: 60, title: 'Charging and Discharging in Resistor-Capacitor (RC) Circuits' },
          { num: 61, title: 'Drift Velocity and Microscopic Form of Ohm\'s Law' },
          { num: 62, title: 'Temperature Coefficient of Resistance and Resistivity' },
          { num: 63, title: 'Kirchhoff\'s First (Current) and Second (Voltage) Rules' },
          { num: 64, title: 'Wheatstone Bridge Principle and Balancing Condition' },
          { num: 65, title: 'Potentiometer: Comparing EMFs and Measuring Unknown Potentials' },
          { num: 66, title: 'Ampere\'s Circuital Law and Magnetic Field of Solenoid' },
          { num: 67, title: 'Lorentz Force on Moving Charges in Magnetic Field' },
          { num: 68, title: 'Determination of e/m Ratio of Electron (J.J. Thomson Method)' },
          { num: 69, title: 'Magnetic Force on Current-Carrying Conductor in Magnetic Field' },
          { num: 70, title: 'Torque on Current Loop and Moving Coil Galvanometer' },
          { num: 71, title: 'Conversion of Galvanometer to Ammeter and Voltmeter' },
          { num: 72, title: 'Electromagnetic Induction: Motional EMF (E = -vBL)' },
          { num: 73, title: 'Faraday\'s Law and Lenz\'s Law Energy Conservation' },
          { num: 74, title: 'Mutual Induction and Self-Induction Mechanisms' },
          { num: 75, title: 'Energy Stored in Inductor Magnetic Field (1/2 LI²)' },
          { num: 76, title: 'Alternating Current Generator (AC Dynamo)' },
          { num: 77, title: 'Electrical Transformer Theory, Losses, and Efficiency' },
          { num: 78, title: 'Alternating Current Circuits: AC through Resistor, Inductor, Capacitor' },
          { num: 79, title: 'Inductive Reactance (XL) and Capacitive Reactance (XC)' },
          { num: 80, title: 'R-C and R-L Series AC Circuits Phasor Diagrams' },
          { num: 81, title: 'R-L-C Series Resonance Circuit and Resonance Frequency' },
          { num: 82, title: 'R-L-C Parallel Resonance Circuit' },
          { num: 83, title: 'Power Factor in AC Circuits (P = VI cosθ)' },
          { num: 84, title: 'Electromagnetic Waves Spectrum and Maxwell\'s Equations' },
          { num: 85, title: 'Physics of Solids: Stress, Strain, and Elastic Moduli' },
          { num: 86, title: 'Strain Energy in Deformed Materials' },
          { num: 87, title: 'Energy Band Theory: Conductors, Semiconductors, Insulators' },
          { num: 88, title: 'Intrinsic and Extrinsic Semiconductors (P-Type & N-Type)' },
          { num: 89, title: 'Superconductivity and High-Temperature Superconductors' },
          { num: 90, title: 'P-N Junction Diode: Forward & Reverse Bias Characteristics' },
          { num: 91, title: 'Half-Wave and Full-Wave Bridge Rectification' },
          { num: 92, title: 'Zener Diode Voltage Regulation' },
          { num: 93, title: 'Photodiode, Solar Cell, and Light Emitting Diode (LED)' },
          { num: 94, title: 'Bipolar Junction Transistor (BJT) Characteristics' },
          { num: 95, title: 'Transistor as Common Emitter Voltage Amplifier' },
          { num: 96, title: 'Operational Amplifier (Op-Amp) Characteristics' },
          { num: 97, title: 'Op-Amp as Inverting Amplifier and Non-Inverting Amplifier' },
          { num: 98, title: 'Op-Amp as Comparator and Night Switch Circuit' },
          { num: 99, title: 'Special Theory of Relativity: Postulates and Consequences' },
          { num: 100, title: 'Time Dilation, Length Contraction, and Mass Variation' },
          { num: 101, title: 'Mass-Energy Equivalence Principle (E = mc²)' },
          { num: 102, title: 'Blackbody Radiation and Planck\'s Quantum Hypothesis' },
          { num: 103, title: 'Photoelectric Effect and Einstein\'s Equation' },
          { num: 104, title: 'Compton Scattering Effect and Wavelength Shift' },
          { num: 105, title: 'Pair Production and Pair Annihilation' },
          { num: 106, title: 'De Broglie Matter Waves and Electron Diffraction' },
          { num: 107, title: 'Heisenberg\'s Uncertainty Principle (Δx·Δp ≥ h/4π)' },
          { num: 108, title: 'Hydrogen Atomic Spectrum: Lyman, Balmer, Paschen Series' },
          { num: 109, title: 'Bohr\'s Quantized Orbits Radii and Energy Levels' },
          { num: 110, title: 'Characteristic and Continuous X-Rays Production' },
          { num: 111, title: 'Lasers: Population Inversion and Stimulated Emission (He-Ne Laser)' },
          { num: 112, title: 'Nuclear Composition, Mass Defect, and Binding Energy Curve' },
          { num: 113, title: 'Radioactive Decay Law and Half-Life Equations' },
          { num: 114, title: 'Radiation Detectors: GM Counter, Wilson Cloud Chamber' },
          { num: 115, title: 'Nuclear Fission Reactors and Nuclear Fusion in Stars' }
        ]
      },
      {
        name: 'CHEMISTRY (FSc CLASS 11 & 12)',
        topics: [
          { num: 116, title: 'Stoichiometry: Mole, Molar Volume, and Stoichiometric Calculations' },
          { num: 117, title: 'Limiting Reactant and Theoretical vs Percentage Yield' },
          { num: 118, title: 'Discovery of Subatomic Particles and Cathode Ray Experiments' },
          { num: 119, title: 'Rutherford & Bohr Atomic Models and Hydrogen Spectra' },
          { num: 120, title: 'Quantum Numbers: Principal (n), Azimuthal (l), Magnetic (m), Spin (s)' },
          { num: 121, title: 'Shapes of s, p, d, f Orbitals' },
          { num: 122, title: 'Aufbau Principle, Pauli Exclusion Principle, and Hund\'s Rule' },
          { num: 123, title: 'VSEPR Theory: Molecular Geometry and Bond Angles' },
          { num: 124, title: 'Valence Bond Theory (VBT) and sp, sp², sp³ Hybridization' },
          { num: 125, title: 'Molecular Orbital Theory (MOT): Homonuclear Diatomic Molecules (O2, N2)' },
          { num: 126, title: 'Ideal Gas Equation (PV = nRT) and Gas Constant R Values' },
          { num: 127, title: 'Graham\'s Law of Diffusion and Effusion' },
          { num: 128, title: 'Dalton\'s Law of Partial Pressures' },
          { num: 129, title: 'Kinetic Molecular Theory of Gases and Derivations' },
          { num: 130, title: 'Real Gases Deviations and Van der Waals Equation' },
          { num: 131, title: 'Joule-Thomson Effect and Liquefaction of Gases' },
          { num: 132, title: 'Intermolecular Forces: London Dispersion, Dipole-Dipole, Hydrogen Bonds' },
          { num: 133, title: 'Evaporation, Vapor Pressure, and Boiling Points in Liquids' },
          { num: 134, title: 'Viscosity and Surface Tension Dynamics' },
          { num: 135, title: 'Liquid Crystals Structure and Applications' },
          { num: 136, title: 'Crystalline Solids, Unit Cells, and Crystal Systems' },
          { num: 137, title: 'Bragg\'s Law of X-Ray Diffraction for Crystal Lattices' },
          { num: 138, title: 'Types of Crystalline Solids: Ionic, Covalent, Molecular, Metallic' },
          { num: 139, title: 'Chemical Equilibrium: Kc, Kp, Kx, Kn Expressions and Conversions' },
          { num: 140, title: 'Le Chatelier\'s Principle: Effect of Concentration, Pressure, Temperature' },
          { num: 141, title: 'Solubility Product (Ksp) and Common Ion Effect' },
          { num: 142, title: 'Concentration Units: Molarity, Molality, Mole Fraction, PPM' },
          { num: 143, title: 'Raoult\'s Law for Ideal and Non-Ideal Liquid Solutions' },
          { num: 144, title: 'Colligative Properties: Boiling Point Elevation and Freezing Point Depression' },
          { num: 145, title: 'Osmotic Pressure and Van \'t Hoff Factor for Electrolytes' },
          { num: 146, title: 'Arrhenius, Bronsted-Lowry, and Lewis Acid-Base Theories' },
          { num: 147, title: 'Ionization of Water, Ka, Kb, and pH Calculations' },
          { num: 148, title: 'Buffer Solutions and Henderson-Hasselbalch Equation' },
          { num: 149, title: 'Chemical Kinetics: Reaction Rates and Rate Equations' },
          { num: 150, title: 'Order of Reactions and Half-Life Method' },
          { num: 151, title: 'Arrhenius Equation and Activation Energy (Ea) Calculation' },
          { num: 152, title: 'Catalysis: Homogeneous vs Heterogeneous Catalysts' },
          { num: 153, title: 'Thermochemistry: First Law of Thermodynamics and Enthalpy Changes' },
          { num: 154, title: 'Calorimetry: Bomb Calorimeter and Coffee-Cup Calorimeter' },
          { num: 155, title: 'Hess\'s Law of Constant Heat Summation' },
          { num: 156, title: 'Born-Haber Cycle for Crystal Lattice Energy' },
          { num: 157, title: 'Redox Reactions and Balancing by Ion-Electron Method' },
          { num: 158, title: 'Faraday\'s Laws of Electrolysis' },
          { num: 159, title: 'Electrochemical Series and Standard Hydrogen Electrode (SHE)' },
          { num: 160, title: 'Galvanic Cells and Nernst Equation' },
          { num: 161, title: 'Lead-Acid Accumulator and Fuel Cells' },
          { num: 162, title: 'Corrosion Mechanisms and Electrochemical Prevention' },
          { num: 163, title: 'Periodic Trends of s-Block and p-Block Elements' },
          { num: 164, title: 'Group 1 & 2 Elements: Down\'s Cell and Nelson\'s Cell Chemistry' },
          { num: 165, title: 'Group 3A & 4A: Boron Compounds, Aluminum, Silicones, Silicates' },
          { num: 166, title: 'Group 5A & 6A: Nitrogen Oxides, Haber Process, Contact Process for H2SO4' },
          { num: 167, title: 'Group 7A & 8A: Halogens Oxidation Powers and Xenon Compounds' },
          { num: 168, title: 'Transition Elements (d-Block): Variable Oxidation States, Colored Ions' },
          { num: 169, title: 'Coordination Compounds: Ligands, Nomenclature, Werner Theory, CFT' },
          { num: 170, title: 'Metallurgy of Iron and Steel Manufacturing' },
          { num: 171, title: 'Organic Chemistry Classification, Functional Groups, and Isomerism' },
          { num: 172, title: 'Alkanes: Free-Radical Halogenation Mechanism' },
          { num: 173, title: 'Alkenes: Electrophilic Addition and Markovnikov\'s Rule' },
          { num: 174, title: 'Alkynes: Preparation and Acidity of Terminal Alkynes' },
          { num: 175, title: 'Benzene: Kekule Structure, Resonance, and Electrophilic Substitution' },
          { num: 176, title: 'Electrophilic Substitution Mechanisms: Halogenation, Nitration, Friedel-Crafts' },
          { num: 177, title: 'Directive Influence of Substituents on Benzene Ring' },
          { num: 178, title: 'Alkyl Halides: Nucleophilic Substitution Mechanisms (SN1 vs SN2)' },
          { num: 179, title: 'Alkyl Halides: Elimination Reactions (E1 vs E2)' },
          { num: 180, title: 'Grignard Reagents Preparation and Synthetic Uses' },
          { num: 181, title: 'Alcohols: Lucas Test and Industrial Fermentation' },
          { num: 182, title: 'Phenols: Acidity, Kolbe\'s Reaction, Reimer-Tiemann Reaction' },
          { num: 183, title: 'Ethers: Williamson Synthesis and Cleavage by HX' },
          { num: 184, title: 'Aldehydes and Ketones: Nucleophilic Addition Reactions' },
          { num: 185, title: 'Aldol Condensation and Cannizzaro Reaction Mechanisms' },
          { num: 186, title: 'Haloform (Iodoform) Reaction Test' },
          { num: 187, title: 'Carboxylic Acids: Synthesis and Acidic Strengths' },
          { num: 188, title: 'Carboxylic Acid Derivatives: Acid Chlorides, Anhydrides, Esters, Amides' },
          { num: 189, title: 'Macromolecules: Polymers (Addition vs Condensation Polymerization)' },
          { num: 190, title: 'Industrial Chemistry: Fertilizers, Paper, Cement, Soaps & Detergents' }
        ]
      },
      {
        name: 'BIOLOGY (FSc CLASS 11 & 12)',
        topics: [
          { num: 191, title: 'Eukaryotic Cell Ultrastructure and Fluid Mosaic Membrane Model' },
          { num: 192, title: 'Endomembrane System: Endoplasmic Reticulum, Golgi Complex, Lysosomes' },
          { num: 193, title: 'Mitochondria, Plastids, and Endosymbiotic Theory' },
          { num: 194, title: 'Biochemistry: Carbohydrates, Lipids, Proteins (4 Structural Levels)' },
          { num: 195, title: 'Enzyme Kinetics: Michaelis-Menten Equation and Inhibition Types' },
          { num: 196, title: 'Acellular Life: Bacteriophage Lytic and Lysogenic Cycles' },
          { num: 197, title: 'Retroviruses, HIV Replication Cycle, and Hepatitis Viruses' },
          { num: 198, title: 'Bacterial Morphology, Gram-Staining, and Genetic Recombination' },
          { num: 199, title: 'Kingdom Protista: Algae, Protozoa (Plasmodium Life Cycle)' },
          { num: 200, title: 'Kingdom Fungi: Hyphal Ultrastructure, Mycorrhizae, Lichens' },
          { num: 201, title: 'Kingdom Plantae: Bryophytes, Pteridophytes, Gymnosperms, Angiosperms' },
          { num: 202, title: 'Alternation of Generations in Plants' },
          { num: 203, title: 'Kingdom Animalia: Invertebrate and Vertebrate Phyla Evolution' },
          { num: 204, title: 'Bioenergetics: Z-Scheme of Photosynthesis (Photosystem II & I)' },
          { num: 205, title: 'Calvin Cycle (C3 Pathway), Photorespiration, and C4 Pathway' },
          { num: 206, title: 'Cellular Respiration: Glycolysis, Krebs Cycle, Chemiosmosis ATP Synthesis' },
          { num: 207, title: 'Gas Exchange in Alveoli and Respiratory Pigments (Bohr & Haldane Effects)' },
          { num: 208, title: 'Human Cardiac Conduction System (SA Node, AV Node, ECG Waves)' },
          { num: 209, title: 'Immune System: Innate vs Adaptive Immunity (B-Cells & T-Cells)' },
          { num: 210, title: 'Osmoregulation in Terrestrial, Marine, and Freshwater Animals' },
          { num: 211, title: 'Mammalian Counter-Current Multiplier System in Nephron' },
          { num: 212, title: 'Thermoregulation Mechanisms in Endotherms and Ectotherms' },
          { num: 213, title: 'Sliding Filament Theory of Skeletal Muscle Contraction' },
          { num: 214, title: 'Action Potential Generation and Saltatory Conduction in Neurons' },
          { num: 215, title: 'Synaptic Transmission and Neurotransmitter Receptors' },
          { num: 216, title: 'Human Brain Functional Regions and Reflex Arcs' },
          { num: 217, title: 'Endocrine System Hormonal Feedback Control Loops' },
          { num: 218, title: 'Plant Hormones: Auxins, Gibberellins, Cytokinins, Abscisic Acid, Ethylene' },
          { num: 219, title: 'Photoperiodism and Phytochrome Signaling' },
          { num: 220, title: 'Animal Behavior: Innate vs Learned Behaviors' },
          { num: 221, title: 'Human Spermatogenesis, Oogenesis, and Menstrual Cycle Hormones' },
          { num: 222, title: 'Fertilization, Blastocyst Implantation, and Placental Physiology' },
          { num: 223, title: 'Animal Development: Cleavage, Gastrulation, Neurulation in Chick' },
          { num: 224, title: 'Spemann-Mangold Embryonic Induction Organizer' },
          { num: 225, title: 'Chromosomal Karyotyping and Genetic Disorders (Down, Turner, Klinefelter)' },
          { num: 226, title: 'DNA Replication: Semi-Conservative Model (Meselson-Stahl Experiment)' },
          { num: 227, title: 'Transcription Mechanism: RNA Polymerase, Promoters, mRNA Processing' },
          { num: 228, title: 'Genetic Code and Translation at Ribosomes' },
          { num: 229, title: 'Gene Expression Regulation: Lac Operon Model' },
          { num: 230, title: 'Mendelian Genetics Extensions: Epistasis and Polygenic Inheritance' },
          { num: 231, title: 'Sex-Linked Inheritance (Hemophilia, Color Blindness)' },
          { num: 232, title: 'Recombinant DNA Technology: Restriction Enzymes and Vectors' },
          { num: 233, title: 'Polymerase Chain Reaction (PCR) and Gel Electrophoresis' },
          { num: 234, title: 'DNA Sequencing and CRISPR-Cas9 Gene Editing' },
          { num: 235, title: 'Evolutionary Theories: Darwinian Natural Selection and Evidence' },
          { num: 236, title: 'Hardy-Weinberg Principle of Population Genetics' },
          { num: 237, title: 'Ecosystem Dynamics, Biogeochemical Cycles, and Global Biomes' }
        ]
      },
      {
        name: 'MATHEMATICS (FSc CLASS 11 & 12)',
        topics: [
          { num: 238, title: 'Complex Numbers: Polar Form, Modulus, Argument, De Moivre\'s Theorem' },
          { num: 239, title: 'Sets, Binary Relations, Injective, Surjective, and Bijective Functions' },
          { num: 240, title: 'Group Theory Axioms and Abelian Groups Verification' },
          { num: 241, title: 'Matrices: Symmetric, Skew-Symmetric, Hermitian, Skew-Hermitian' },
          { num: 242, title: 'Determinants Properties and Rank of Matrix' },
          { num: 243, title: 'Gaussian Elimination and Gauss-Jordan Methods for Linear Systems' },
          { num: 244, title: 'Quadratic Equations: Reciprocal, Radical, and Exponential Types' },
          { num: 245, title: 'Partial Fractions: Linear and Irreducible Quadratic Factors' },
          { num: 246, title: 'Arithmetic Progression (AP) and Arithmetic Mean (AM)' },
          { num: 247, title: 'Geometric Progression (GP), Geometric Mean (GM), and Infinite Series' },
          { num: 248, title: 'Harmonic Progression (HP) and AM-GM-HM Relations' },
          { num: 249, title: 'Permutations, Combinations, and Selection Calculations' },
          { num: 250, title: 'Probability Laws: Addition, Multiplication, and Conditional Probability' },
          { num: 251, title: 'Principle of Mathematical Induction Proofs' },
          { num: 252, title: 'Binomial Theorem for Positive Integer and Rational Indices' },
          { num: 253, title: 'Trigonometric Functions on Unit Circle, Radians, and Sector Area' },
          { num: 254, title: 'Addition and Subtraction Formulas for sin(α±β), cos(α±β), tan(α±β)' },
          { num: 255, title: 'Double-Angle, Half-Angle, and Triple-Angle Trigonometric Formulas' },
          { num: 256, title: 'Product-to-Sum and Sum-to-Product Trigonometric Transformations' },
          { num: 257, title: 'Trigonometric Functions Domains, Ranges, and Periodic Graphs' },
          { num: 258, title: 'Solution of Oblique Triangles: Law of Sines, Law of Cosines, Law of Tangents' },
          { num: 259, title: 'Inradius (r), Circumradius (R), and Exradii (r1, r2, r3) of Triangles' },
          { num: 260, title: 'Inverse Trigonometric Functions and Principal Values' },
          { num: 261, title: 'General Solutions of Trigonometric Equations' },
          { num: 262, title: 'Functions: Domain, Range, Even/Odd, and Composite Functions' },
          { num: 263, title: 'Limits of Functions: Algebraic, Trigonometric, and Exponential Limits' },
          { num: 264, title: 'Continuity of Functions and Discontinuity Points' },
          { num: 265, title: 'Differentiation from First Principles (Ab-Initio Method)' },
          { num: 266, title: 'Differentiation Rules: Product Rule, Quotient Rule, Chain Rule' },
          { num: 267, title: 'Derivatives of Algebraic, Trigonometric, Exponential, Logarithmic Functions' },
          { num: 268, title: 'Implicit Differentiation and Parametric Derivatives' },
          { num: 269, title: 'Higher-Order Derivatives and Leibniz\'s Theorem' },
          { num: 270, title: 'Tangent and Normal Lines to Curves' },
          { num: 271, title: 'Maxima and Minima Optimization: First and Second Derivative Tests' },
          { num: 272, title: 'Taylor and Maclaurin Series Expansions' },
          { num: 273, title: 'L\'Hôpital\'s Rule for Indeterminate Forms' },
          { num: 274, title: 'Indefinite Integrals: Fundamental Anti-Derivative Formulas' },
          { num: 275, title: 'Integration by Substitution and Trigonometric Substitutions' },
          { num: 276, title: 'Integration by Parts Method' },
          { num: 277, title: 'Integration of Rational Fractions using Partial Fractions' },
          { num: 278, title: 'Definite Integrals and Fundamental Theorem of Calculus' },
          { num: 279, title: 'Area Under a Curve and Area Between Two Curves' },
          { num: 280, title: 'Differential Equations: Separation of Variables and Homogeneous Equations' },
          { num: 281, title: 'Analytic Geometry: Distance Formula and Ratio Division Formula' },
          { num: 282, title: 'Straight Lines: Slope, Point-Slope, Two-Point, Intercept, Normal Forms' },
          { num: 283, title: 'Perpendicular Distance of Point from Line' },
          { num: 284, title: 'Homogeneous Second-Degree Equation and Pair of Lines' },
          { num: 285, title: 'Linear Programming: Feasible Region and Corner Point Optimization' },
          { num: 286, title: 'Circle: Standard and General Equations, Tangents, and Normals' },
          { num: 287, title: 'Parabola: Standard Equations, Focus, Directrix, Tangents' },
          { num: 288, title: 'Ellipse: Major and Minor Axes, Foci, Eccentricity, Tangents' },
          { num: 289, title: 'Hyperbola: Foci, Asymptotes, Eccentricity, Rectangular Hyperbola' },
          { num: 290, title: 'Vectors in 3D: Direction Cosines, Scalar & Vector Triple Products' },
          { num: 291, title: 'Vector Equations of Lines and Planes in 3D Space' }
        ]
      },
      {
        name: 'COMPUTER SCIENCE (ICS CLASS 11 & 12)',
        topics: [
          { num: 292, title: 'System Bus Architecture (Data, Address, Control Buses)' },
          { num: 293, title: 'CPU Architecture: Fetch-Decode-Execute Instruction Cycle' },
          { num: 294, title: 'Memory Hierarchy: Cache, Registers, RAM, Virtual Memory' },
          { num: 295, title: 'Operating Systems Process Scheduling (FCFS, Round Robin)' },
          { num: 296, title: 'Network Media: Fiber Optics, Coaxial, Wireless Microwave' },
          { num: 297, title: 'OSI 7-Layer Reference Model and Protocol Data Units' },
          { num: 298, title: 'TCP/IP Protocol Suite and IPv4 / IPv6 Subnetting' },
          { num: 299, title: 'Network Devices: Hubs, Switches, Routers, Gateways' },
          { num: 300, title: 'Database Management Systems (DBMS) Architecture' },
          { num: 301, title: 'Relational Model: Tables, Keys (Primary, Foreign, Composite)' },
          { num: 302, title: 'Entity-Relationship (ER) Diagrams and Cardinality' },
          { num: 303, title: 'Database Normalization: 1NF, 2NF, 3NF Forms' },
          { num: 304, title: 'SQL Data Definition Language (CREATE, ALTER, DROP)' },
          { num: 305, title: 'SQL Data Manipulation Language (SELECT, INSERT, UPDATE, DELETE)' },
          { num: 306, title: 'SQL Aggregate Functions, GROUP BY, and HAVING Clauses' },
          { num: 307, title: 'SQL Relational Joins (INNER, LEFT, RIGHT Joins)' },
          { num: 308, title: 'C++ / OOP: Classes, Objects, and Access Specifiers' },
          { num: 309, title: 'C++ Constructors, Destructors, and Function Overloading' },
          { num: 310, title: 'C++ Inheritance: Single, Multiple, Multilevel Inheritance' },
          { num: 311, title: 'C++ Polymorphism and Virtual Functions' },
          { num: 312, title: 'Pointers and Dynamic Memory Allocation in C++' },
          { num: 313, title: 'File Handling Streams in C++ (fstream, ifstream, ofstream)' }
        ]
      },
      {
        name: 'COMMERCE & ECONOMICS (I.Com & FA CLASS 11 & 12)',
        topics: [
          { num: 314, title: 'Accounting Equation: Assets = Liabilities + Owner\'s Equity' },
          { num: 315, title: 'Double-Entry Bookkeeping and Journal Entries' },
          { num: 316, title: 'General Ledger Posting and Trial Balance Preparation' },
          { num: 317, title: 'Cash Book (Single, Double, Triple Column) & Petty Cash' },
          { num: 318, title: 'Bank Reconciliation Statements (BRS)' },
          { num: 319, title: 'Depreciation Accounting: Straight-Line vs Diminishing Balance' },
          { num: 320, title: 'Trading Account, Profit & Loss Account, and Balance Sheet' },
          { num: 321, title: 'Bills of Exchange: Drawing, Acceptance, Discounting, Dishonor' },
          { num: 322, title: 'Law of Diminishing Marginal Utility and Consumer Equilibrium' },
          { num: 323, title: 'Law of Demand and Price Elasticity of Demand' },
          { num: 324, title: 'Law of Supply and Market Equilibrium Price Determination' },
          { num: 325, title: 'Cost and Revenue Curves (TC, AC, MC, TR, MR)' },
          { num: 326, title: 'Market Structures: Perfect Competition vs Monopoly' },
          { num: 327, title: 'National Income Concepts: GDP, GNP, NNP, DPI' },
          { num: 328, title: 'Central Bank (State Bank of Pakistan) Monetary Policy' },
          { num: 329, title: 'Public Finance, Taxation Principles, and Fiscal Policy' },
          { num: 330, title: 'Business Mathematics: Simple vs Compound Interest' },
          { num: 331, title: 'Index Numbers (Laspeyres, Paasche, Fisher Ideal Index)' },
          { num: 332, title: 'Time Series Analysis: Moving Averages Method' }
        ]
      }
    ]
  },
  {
    id: 'cross-level',
    title: 'CROSS-LEVEL & MULTI-GRADE COMPREHENSIVE SUBJECTS',
    sections: [
      {
        name: 'GEOGRAPHY & EARTH SYSTEMS',
        topics: [
          { num: 1, title: 'Plate Tectonics & Continental Drift Simulator' },
          { num: 2, title: 'Earthquake Epicenter, Fault Lines, and Richter Scale Seismograph' },
          { num: 3, title: 'Volcanoes, Magma Chambers, and Lava Dynamics' },
          { num: 4, title: 'Mountain Ranges of Pakistan (Himalayas, Karakoram, Hindu Kush)' },
          { num: 5, title: 'Indus River Basin and River Drainage Systems' },
          { num: 6, title: 'Glaciers of Pakistan (Siachen, Baltoro, Batura)' },
          { num: 7, title: 'Monsoon Climate Cycles and Flood Dynamics in South Asia' },
          { num: 8, title: 'Deserts of Pakistan (Thar, Cholistan, Thal, Kharan)' },
          { num: 9, title: 'Global Atlas: Continents, Oceans, Tropics, and Coordinate Lines' }
        ]
      },
      {
        name: 'PAKISTAN STUDIES, HISTORY & HERITAGE',
        topics: [
          { num: 10, title: 'Indus Valley Civilization: Mohenjo-daro & Harappa Architecture' },
          { num: 11, title: 'Gandhara Civilization and Taxila Buddhist Heritage' },
          { num: 12, title: 'Mughal Architectural Heritage in Pakistan (Badshahi Mosque, Lahore Fort, Shalimar)' },
          { num: 13, title: 'Sir Syed Ahmad Khan and the Aligarh Educational Movement' },
          { num: 14, title: 'All-India Muslim League Formation (1906)' },
          { num: 15, title: 'Allama Iqbal\'s Historical Allahabad Address (1930)' },
          { num: 16, title: 'The Lahore Resolution (Pakistan Resolution 1940)' },
          { num: 17, title: 'Quaid-e-Azam Muhammad Ali Jinnah: 14 Points and Leadership' },
          { num: 18, title: 'Independence of Pakistan (14 August 1947) and Early Challenges' },
          { num: 19, title: 'Constitutions of Pakistan (1956, 1962, 1973)' },
          { num: 20, title: 'Geostrategic Importance of Pakistan in South and Central Asia' },
          { num: 21, title: 'National Symbols, Provincial Heritage, and Regional Languages of Pakistan' }
        ]
      },
      {
        name: 'ISLAMIAT (ISLAMIC STUDIES & ETHICS)',
        topics: [
          { num: 22, title: 'Arkan-e-Islam: Tawheed, Salah, Zakat, Sawm, Hajj' },
          { num: 23, title: 'Step-by-Step Interactive Wudu (Ablution) Guide' },
          { num: 24, title: 'Step-by-Step Interactive Salah Guide with Postures and Prayers' },
          { num: 25, title: 'Prayer Times and Qibla Direction Compass' },
          { num: 26, title: 'Step-by-Step Hajj and Umrah Walkthrough Simulator' },
          { num: 27, title: 'Islamic (Hijri) Lunar Calendar Converter' },
          { num: 28, title: 'Seerat-un-Nabi (PBUH) Historical Milestones' },
          { num: 29, title: 'Makkah Period, Migration to Madinah, and Charter of Madinah' },
          { num: 30, title: 'Quranic Recitation & Tajweed Fundamentals' },
          { num: 31, title: 'Islamic Ethics: Honesty, Truthfulness, Respect for Parents and Teachers' }
        ]
      },
      {
        name: 'ENGLISH LANGUAGE & APPLIED LINGUISTICS',
        topics: [
          { num: 32, title: 'Parts of Speech Sorter (Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, Interjection)' },
          { num: 33, title: 'Verb Tenses Complete Interactive Timeline (Past, Present, Future: Simple, Continuous, Perfect, Perfect Continuous)' },
          { num: 34, title: 'Active and Passive Voice Conversion Rules Across All Tenses' },
          { num: 35, title: 'Direct and Indirect Speech Transformation Studio' },
          { num: 36, title: 'Sentence Types: Simple, Compound, Complex, Compound-Complex' },
          { num: 37, title: 'English Syntax Trees and Sentence Diagramming' },
          { num: 38, title: 'Subject-Verb Agreement Interactive Rules' },
          { num: 39, title: 'Vocabulary Builder: Idioms, Phrasal Verbs, and Collocations' },
          { num: 40, title: 'Reading Comprehension with Dynamic Contextual Analysis' }
        ]
      },
      {
        name: 'URDU LANGUAGE & LITERATURE (اردو زبان، قواعد و ادب)',
        topics: [
          { num: 41, title: 'حروفِ تہجی و اشکال کی تختی' },
          { num: 42, title: 'اعراب اور علاماتِ ترقیم (حرکات و سکنات)' },
          { num: 43, title: 'اجزائے کلام: اسم، ضمیر، فعل، صفت، حرف' },
          { num: 44, title: 'اسم کی اقسام: اسمِ معرفہ، اسمِ نکرہ، اسمِ ذات' },
          { num: 45, title: 'صفت کی اقسام: صفتِ ذاتی، صفتِ نسبتی، صفتِ عددی، صفتِ مقداری' },
          { num: 46, title: 'فعل کی اقسام بلحاظ زمانہ (ماضی، حال، مستقبل)' },
          { num: 47, title: 'فعلِ لازم اور فعلِ متعدی کی پہچان' },
          { num: 48, title: 'واحد اور جمع کے باقاعدہ و بے قاعدہ اصول' },
          { num: 49, title: 'تذکیر و تانیث کے مکمل قواعد' },
          { num: 50, title: 'الفاظ متضاد، مترادف اور متشابہ الفاظ کی مشقیں' },
          { num: 51, title: 'سابقے اور لاحقے (مرکب الفاظ کی ساخت)' },
          { num: 52, title: 'محاورات اور ضرب الامثال کا درست سیاق و سباق' },
          { num: 53, title: 'اصنافِ سخن: غزل، نظم، قطعہ، اور رباعی کی پہچان' }
        ]
      },
      {
        name: 'GENERAL KNOWLEDGE & GLOBAL CURRENT AFFAIRS',
        topics: [
          { num: 54, title: 'World Countries, National Flags, and Capital Cities' },
          { num: 55, title: 'Famous Scientists, Mathematicians, and Inventors Timeline' },
          { num: 56, title: 'Major Scientific Discoveries and Nobel Laureates' },
          { num: 57, title: 'Solar System, Space Telescopes, and Mars Rover Missions' },
          { num: 58, title: 'United Nations and International Organizations' },
          { num: 59, title: 'Global Biodiversity Hotspots and Endangered Wildlife' }
        ]
      },
      {
        name: 'ENVIRONMENTAL SCIENCE & CLIMATE ACTION',
        topics: [
          { num: 60, title: 'Atmospheric Pollution: Greenhouse Gases and Global Warming' },
          { num: 61, title: 'Acid Rain Formation and Ecological Consequences' },
          { num: 62, title: 'Deforestation, Desertification, and Soil Degradation' },
          { num: 63, title: 'Water Conservation, Rainwater Harvesting, and Aquifer Depletion' },
          { num: 64, title: 'Renewable Energy: Solar Photovoltaics, Wind Turbines, Hydroelectric' },
          { num: 65, title: 'The 3Rs Solid Waste Management (Reduce, Reuse, Recycle)' },
          { num: 66, title: 'Ozone Layer Protection, Montreal Protocol, and Climate Treaties' }
        ]
      }
    ]
  }
];

export const SimulationRoadmapSection: React.FC = () => {
  // Always expanded by default on every load
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({
    'level-1': true,
    'level-2': true,
    'level-3': true,
    'level-4': true,
    'level-5': true,
    'level-6': true,
    'cross-level': true
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const allBlocksExpanded = Object.values(expandedBlocks).every(Boolean);

  const toggleBlock = (blockId: string) => {
    setExpandedBlocks((prev) => ({
      ...prev,
      [blockId]: !prev[blockId]
    }));
  };

  const handleToggleAll = () => {
    const nextState = !allBlocksExpanded;
    setExpandedBlocks({
      'level-1': nextState,
      'level-2': nextState,
      'level-3': nextState,
      'level-4': nextState,
      'level-5': nextState,
      'level-6': nextState,
      'cross-level': nextState
    });
  };

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase().trim());
  };

  return (
    <section 
      aria-label="Simulation Roadmap"
      className="gz-roadmap-section w-full my-6 sm:my-8 rounded-2xl border border-slate-300 shadow-sm relative z-10 font-sans"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#000000'
      }}
    >
      <div className="p-6 sm:p-10 lg:p-12 space-y-8 bg-white text-black">
        
        {/* Section Header */}
        <div className="space-y-4 border-b border-slate-300 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-black bg-slate-100 px-3 py-1 rounded border border-slate-300">
              Roadmap
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter topics..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-300 bg-white text-black placeholder-slate-500 focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="button"
                onClick={handleToggleAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold border border-slate-400 bg-slate-100 hover:bg-slate-200 text-black shadow-xs transition-colors cursor-pointer shrink-0"
              >
                {allBlocksExpanded ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Collapse All</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand All</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-tight">
            Complete Interactive Simulation Roadmap: Play Class to FSc
          </h2>

          <p className="text-sm sm:text-base text-black leading-relaxed">
            Gen Z Interactive Simulations covers every subject of the Pakistani curriculum, from Play Group all the way to FSc (Intermediate, Class 11-12). Below is the comprehensive roadmap of topics across each subject and grade level on which interactive simulations are available and can be created:
          </p>
        </div>

        {/* Grade-Level Roadmap Blocks (Pure black text, clean document layout, no cards) */}
        <div className="space-y-8">
          {ROADMAP_DATA.map((level) => {
            const isExpanded = !!expandedBlocks[level.id];

            const filteredSections = level.sections.map((sec) => ({
              ...sec,
              topics: sec.topics.filter(
                (t) => matchesSearch(t.title) || (sec.name && matchesSearch(sec.name))
              )
            })).filter((sec) => sec.topics.length > 0);

            if (searchQuery.trim() && filteredSections.length === 0) {
              return null;
            }

            return (
              <div key={level.id} className="border-b border-slate-200 pb-7 last:border-b-0">
                {/* Level Title Header */}
                <div 
                  className="flex items-center justify-between gap-3 cursor-pointer select-none pb-2"
                  onClick={() => toggleBlock(level.id)}
                >
                  <h3 className="text-base sm:text-lg font-black text-black uppercase tracking-wide">
                    {level.title}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBlock(level.id);
                    }}
                    className="p-1 rounded text-black hover:bg-slate-100 transition-colors"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-3 space-y-6">
                    {filteredSections.map((sec, sIdx) => (
                      <div key={`${level.id}-sec-${sIdx}`} className="space-y-2">
                        {sec.name && (
                          <h4 className="text-xs sm:text-sm font-black text-black uppercase tracking-wider pt-2 border-b border-slate-200 pb-1">
                            {sec.name}
                          </h4>
                        )}

                        {/* Clean multi-column readable plain text list, no cards or boxes */}
                        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 pl-0 list-none text-sm text-black">
                          {sec.topics.map((t) => (
                            <li key={`${level.id}-${t.num}-${t.title}`} className="flex items-baseline gap-2 py-0.5">
                              <span className="font-bold text-black shrink-0">{t.num}.</span>
                              <span className="text-black font-medium">{t.title}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
