import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';

interface TopicItem {
  id: string;
  num: number;
  title: string;
  desc: string;
}

interface SubjectGroup {
  name?: string;
  topics: TopicItem[];
}

interface LevelBlock {
  id: string;
  title: string;
  goal: string;
  subjects: SubjectGroup[];
}

const ROADMAP_LEVELS: LevelBlock[] = [
  {
    id: 'level-1',
    title: 'LEVEL 1: PLAY GROUP, NURSERY, PREP (Ages 3-5)',
    goal: 'Build curiosity, recognition, and basic vocabulary through touch, sound, and colorful animation. Interfaces must use very large buttons, minimal text, friendly cartoon characters, and voice or sound feedback.',
    subjects: [
      {
        topics: [
          {
            id: 'l1-1',
            num: 1,
            title: 'Shapes & Colors Sorter',
            desc: 'The child drags circles, squares, triangles, rectangles, and stars into matching outlines. When a shape is placed correctly, it glows and its name and color are spoken in English and Urdu. This teaches shape recognition, color names, and hand-eye coordination.'
          },
          {
            id: 'l1-2',
            num: 2,
            title: 'Counting Fun 1-20',
            desc: 'Animated objects such as apples, balloons, stars, and fish appear on the screen. The child taps each object, a number sound plays, and the total is shown at the end. A "How many?" mode asks the child to choose the correct number. This teaches one-to-one counting and number recognition.'
          },
          {
            id: 'l1-3',
            num: 3,
            title: 'Alphabet Adventure (A-Z and Urdu Haroof-e-Tahajji)',
            desc: 'Each letter is a large tile. Tapping it shows an animated picture (A for Apple, B for Ball, and Alif for Anar, Bay for Bakri) and plays the letter sound. A tracing mode lets the child draw the letter with a finger. This teaches letter shapes and phonics.'
          },
          {
            id: 'l1-4',
            num: 4,
            title: 'Animal Sounds & Homes',
            desc: 'Farm animals and wild animals appear with their sounds. The child matches each animal to its home (barn, nest, den, pond, hive) and to its sound. This teaches animal names, habitats, and listening skills.'
          },
          {
            id: 'l1-5',
            num: 5,
            title: 'My Body Parts',
            desc: 'A friendly cartoon child is shown. Touching eyes, nose, ears, mouth, hands, and feet highlights the part, says its name, and shows a simple function such as "Eyes help us see." This teaches body awareness and the five senses.'
          },
          {
            id: 'l1-6',
            num: 6,
            title: 'Day & Night and Weather Basics',
            desc: 'A slider moves the sun and moon across the sky, changing the background from morning to night. Weather buttons switch between sunny, cloudy, rainy, and windy, with matching clothes the child can drag onto a character. This teaches time of day and weather vocabulary.'
          },
          {
            id: 'l1-7',
            num: 7,
            title: 'Fruits & Vegetables Basket',
            desc: 'The child drags fruits and vegetables into the correct baskets and sees their color and name. A "healthy plate" mini game rewards healthy choices. This teaches food names, colors, and healthy eating.'
          },
          {
            id: 'l1-8',
            num: 8,
            title: 'Big & Small, Long & Short',
            desc: 'Pairs of objects appear, and the child taps the bigger, smaller, longer, or shorter one. Objects can be stretched with a slider for comparison. This teaches early measurement language.'
          },
          {
            id: 'l1-9',
            num: 9,
            title: 'Pattern Maker',
            desc: 'The child continues simple color or shape patterns (red-blue-red-blue). Correct answers complete a fun animation. This teaches early logic and sequencing.'
          }
        ]
      }
    ]
  },
  {
    id: 'level-2',
    title: 'LEVEL 2: CLASS 1-2 (Ages 6-7)',
    goal: 'Introduce early reading, number operations, and basic science through guided play. Each lab has short instructions, picture hints, and instant "well done" feedback.',
    subjects: [
      {
        topics: [
          {
            id: 'l2-1',
            num: 1,
            title: 'Addition & Subtraction Blocks',
            desc: 'Colored blocks and an animated number line show how two numbers join (addition) or how some are taken away (subtraction). The child can change the numbers and watch the blocks and the hops on the number line update. This teaches the meaning of plus and minus with visual proof.'
          },
          {
            id: 'l2-2',
            num: 2,
            title: 'Place Value Abacus',
            desc: 'A virtual abacus with ones, tens, and hundreds rods. The child slides beads and sees the number form, for example 2 hundreds + 4 tens + 7 ones = 247. This teaches place value and number building.'
          },
          {
            id: 'l2-3',
            num: 3,
            title: 'Clock Reading Lab',
            desc: 'A large analog clock with draggable hour and minute hands and a digital clock that updates live. Challenge mode says "Set the time to half past 4." Includes AM/PM and day-routine pictures. This teaches reading and setting time.'
          },
          {
            id: 'l2-4',
            num: 4,
            title: 'Money & Shopping Simulator',
            desc: 'A small shop with items priced in Pakistani rupees. The child picks Rs. 5, 10, 20, 50, 100 notes and coins to pay and receives change. This teaches money recognition, addition, and everyday math.'
          },
          {
            id: 'l2-5',
            num: 5,
            title: 'Skip Counting & Number Patterns',
            desc: 'Frogs hop along a number line by 2s, 5s, and 10s, leaving colored marks. The child predicts the next numbers. This teaches the base for multiplication.'
          },
          {
            id: 'l2-6',
            num: 6,
            title: 'Shapes & Measurement Lab',
            desc: 'The child measures objects with a virtual ruler in centimeters and compares lengths, weights (balance scale), and capacity (cups and jugs). This teaches basic measurement.'
          },
          {
            id: 'l2-7',
            num: 7,
            title: 'Living vs Non-Living Sorter',
            desc: 'The child drags pictures (dog, stone, tree, car, bird, water) into "Living" or "Non-Living" and receives a short reason for each answer. This teaches the characteristics of living things.'
          },
          {
            id: 'l2-8',
            num: 8,
            title: 'Parts of a Plant & Seed Growth',
            desc: 'Tapping root, stem, leaf, flower, and fruit shows the job of each part. A seed can be planted and given water and sunlight, and a time-lapse shows it growing. Too little water or light shows the plant wilting. This teaches what plants need.'
          },
          {
            id: 'l2-9',
            num: 9,
            title: 'Five Senses Lab',
            desc: 'The child matches sense organs with activities (smelling a flower, tasting a lemon, hearing a bell, touching ice, seeing a rainbow). This teaches how we sense the world.'
          },
          {
            id: 'l2-10',
            num: 10,
            title: 'Good Habits & Safety',
            desc: 'Interactive scenes teach hand washing, brushing teeth, road safety, and traffic light rules with simple choices and feedback.'
          },
          {
            id: 'l2-11',
            num: 11,
            title: 'Urdu & English Word Builder',
            desc: 'Letters are dragged into slots to form simple words with a picture hint (cat, sun, bat, and Urdu equivalents). This teaches spelling and vocabulary.'
          }
        ]
      }
    ]
  },
  {
    id: 'level-3',
    title: 'LEVEL 3: CLASS 3-5 (Primary)',
    goal: 'Build strong foundations in math and science with visual, hands-on experiments and simple quizzes.',
    subjects: [
      {
        name: 'MATHEMATICS',
        topics: [
          {
            id: 'l3-1',
            num: 1,
            title: 'Multiplication Tables Visualizer',
            desc: 'Arrays of dots and animated grids show 3 x 4 as three rows of four. The child chooses any table up to 20 and sees patterns. A speed quiz is included. This teaches multiplication as repeated addition.'
          },
          {
            id: 'l3-2',
            num: 2,
            title: 'Division & Sharing Lab',
            desc: 'Items are shared equally among groups, with remainders shown clearly. This teaches division as fair sharing and connects it to multiplication.'
          },
          {
            id: 'l3-3',
            num: 3,
            title: 'Fractions Pizza & Bar Model',
            desc: 'Pizzas and bars are sliced into equal parts. The child shades parts to build fractions, compares two fractions side by side, adds fractions with like denominators, and finds equivalent fractions. This teaches fractions visually.'
          },
          {
            id: 'l3-4',
            num: 4,
            title: 'Decimals & Percentages Lab',
            desc: 'Sliders link fractions, decimals, and percentages on a single bar and on a 100-grid. This teaches that 1/2 = 0.5 = 50%.'
          },
          {
            id: 'l3-5',
            num: 5,
            title: 'Geometry Playground',
            desc: 'The child builds shapes on a grid, measures sides and angles, and sees perimeter and area calculated live. This teaches 2D shapes, perimeter, and area.'
          },
          {
            id: 'l3-6',
            num: 6,
            title: 'Data Handling & Graphs',
            desc: 'The class enters simple data (favorite fruit, favorite sport) and the lab instantly draws bar charts, pictographs, and pie charts. This teaches reading and creating graphs.'
          },
          {
            id: 'l3-7',
            num: 7,
            title: 'Time, Calendar & Money Word Problems',
            desc: 'Interactive story problems with clocks, calendars, and shopping carts for practicing real-life math.'
          }
        ]
      },
      {
        name: 'SCIENCE',
        topics: [
          {
            id: 'l3-8',
            num: 8,
            title: 'States of Matter Simulator',
            desc: 'A container of particles can be heated or cooled. The child watches particles vibrate, flow, or fly apart as the substance changes between solid, liquid, and gas, with a temperature meter. This teaches melting, freezing, boiling, and condensation.'
          },
          {
            id: 'l3-9',
            num: 9,
            title: 'Water Cycle Animation',
            desc: 'The sun, sea, clouds, mountains, and rain are shown. The child changes temperature and sunlight to control evaporation, condensation, and rainfall. This teaches the continuous movement of water.'
          },
          {
            id: 'l3-10',
            num: 10,
            title: 'Food Chain & Food Web Builder',
            desc: 'The child connects plants, insects, herbivores, carnivores, and decomposers with arrows. Removing one organism shows the effect on the others. This teaches energy flow and balance in nature.'
          },
          {
            id: 'l3-11',
            num: 11,
            title: 'Simple Machines Lab',
            desc: 'Levers, pulleys, inclined planes, wheels and axles, and wedges can be tested. The child changes the load and effort and sees how the machine makes work easier. This teaches force and mechanical advantage in simple form.'
          },
          {
            id: 'l3-12',
            num: 12,
            title: 'Magnets Lab',
            desc: 'The child drags magnets and objects, tests which materials are magnetic, and sees attraction and repulsion between poles. Iron filings show field lines. This teaches magnetism.'
          },
          {
            id: 'l3-13',
            num: 13,
            title: 'Light & Shadows',
            desc: 'A torch and an object are placed on a table. The child moves them to see how shadow size, shape, and position change. Transparent, translucent, and opaque materials can be tested. This teaches how light travels in straight lines.'
          },
          {
            id: 'l3-14',
            num: 14,
            title: 'Solar System Explorer',
            desc: 'Planets orbit the Sun at scaled speeds. Tapping a planet shows its size, distance, number of moons, and a fun fact. This teaches the order and features of planets.'
          },
          {
            id: 'l3-15',
            num: 15,
            title: "Day, Night, Seasons & Earth's Tilt",
            desc: "Earth rotates and revolves around the Sun with a visible tilt. The child sees why day and night happen and why seasons change. This teaches Earth's motion."
          },
          {
            id: 'l3-16',
            num: 16,
            title: 'Human Body Systems Intro',
            desc: 'Tapping the skeleton, muscles, heart, lungs, and stomach shows what each does in simple animation.'
          },
          {
            id: 'l3-17',
            num: 17,
            title: 'Plants & Animals Classification',
            desc: 'The child sorts organisms into mammals, birds, reptiles, fish, insects, and into flowering and non-flowering plants.'
          }
        ]
      },
      {
        name: 'SOCIAL STUDIES AND GENERAL KNOWLEDGE',
        topics: [
          {
            id: 'l3-18',
            num: 18,
            title: 'Map of Pakistan Explorer',
            desc: "Tap provinces, capitals, major cities, rivers, mountains (K2, Nanga Parbat), and deserts. A map-labeling quiz is included. This teaches Pakistan's geography."
          },
          {
            id: 'l3-19',
            num: 19,
            title: 'Pakistan Landmarks & Culture',
            desc: 'A tour of famous places (Badshahi Mosque, Mohenjo-daro, Minar-e-Pakistan, Faisal Mosque) with pictures and short facts.'
          }
        ]
      }
    ]
  },
  {
    id: 'level-4',
    title: 'LEVEL 4: CLASS 6-8 (Middle School)',
    goal: 'Move from observation to explanation. Learners start using variables, graphs, and the scientific method.',
    subjects: [
      {
        name: 'GENERAL SCIENCE',
        topics: [
          {
            id: 'l4-1',
            num: 1,
            title: 'Cell Structure Explorer (Plant vs Animal)',
            desc: 'A rotatable 3D cell. Tapping the nucleus, mitochondria, chloroplast, cell wall, vacuole, and other organelles highlights them and explains their function. A comparison toggle shows plant and animal cells side by side.'
          },
          {
            id: 'l4-2',
            num: 2,
            title: 'Microscope Simulator',
            desc: 'The child adjusts focus, magnification (4x, 10x, 40x), and light to view onion peel, cheek cells, pond water, and leaf stomata. A drawing/labeling tool is included. This teaches microscope handling and cell observation.'
          },
          {
            id: 'l4-3',
            num: 3,
            title: 'Photosynthesis Lab',
            desc: 'Sliders control light intensity, carbon dioxide, and water. The lab shows oxygen bubbles and glucose production and graphs the rate. This teaches the factors affecting photosynthesis.'
          },
          {
            id: 'l4-4',
            num: 4,
            title: 'Human Digestive System',
            desc: 'Follow a piece of food from mouth to intestine. Enzymes, stomach acid, bile, and absorption are shown with timing. This teaches digestion step by step.'
          },
          {
            id: 'l4-5',
            num: 5,
            title: 'Respiratory & Circulatory Systems',
            desc: 'Animated breathing with the diaphragm, gas exchange in alveoli, heartbeat, and blood flow through arteries and veins. A pulse rate experiment (rest vs exercise) is included.'
          },
          {
            id: 'l4-6',
            num: 6,
            title: 'Atoms, Elements & Compounds',
            desc: 'The child builds atoms by adding protons, neutrons, and electrons and sees the element name, atomic number, and mass number change. Simple compounds like H2O and CO2 can be assembled. This teaches atomic structure basics.'
          },
          {
            id: 'l4-7',
            num: 7,
            title: 'Mixtures & Separation Techniques',
            desc: 'Virtual lab benches for filtration, evaporation, distillation, sieving, magnetic separation, and paper chromatography. The child chooses the right method for each mixture.'
          },
          {
            id: 'l4-8',
            num: 8,
            title: 'Acids, Bases & Indicators',
            desc: 'Test lemon juice, soap, vinegar, milk, and baking soda with litmus paper and universal indicator, and see the pH scale. This teaches properties of acids and bases.'
          },
          {
            id: 'l4-9',
            num: 9,
            title: 'Physical vs Chemical Changes',
            desc: 'The child melts ice, burns paper, rusts iron, dissolves salt, and bakes dough, then classifies each change and sees the evidence (gas, color, heat, new substance).'
          },
          {
            id: 'l4-10',
            num: 10,
            title: 'Motion & Speed Lab',
            desc: 'Cars move along a track. The child sets speed and time and sees a live distance-time graph. This teaches speed = distance / time and graph reading.'
          },
          {
            id: 'l4-11',
            num: 11,
            title: 'Force, Friction & Gravity',
            desc: 'Boxes are pushed over different surfaces (ice, wood, sand) and on different planets. Force arrows and friction values are displayed. This teaches balanced and unbalanced forces.'
          },
          {
            id: 'l4-12',
            num: 12,
            title: 'Sound Waves Lab',
            desc: 'Change frequency and amplitude to see wave shape and hear pitch and loudness. Compare sound in air, water, and vacuum. This teaches sound properties.'
          },
          {
            id: 'l4-13',
            num: 13,
            title: 'Light, Reflection & Mirrors',
            desc: 'Rays reflect from plane mirrors with a measurable angle of incidence and reflection. A periscope builder is included.'
          },
          {
            id: 'l4-14',
            num: 14,
            title: 'Simple Electric Circuits',
            desc: 'The child builds series and parallel circuits with batteries, bulbs, switches, and wires. A short circuit warning and conductor/insulator tests are included. This teaches how current flows.'
          },
          {
            id: 'l4-15',
            num: 15,
            title: 'Heat Transfer',
            desc: 'Animated particles show conduction in a metal rod, convection in water, and radiation from the Sun. This teaches the three modes of heat transfer.'
          },
          {
            id: 'l4-16',
            num: 16,
            title: 'Weather, Climate & Rocks',
            desc: 'Interactive weather station, rock cycle, and layers of the Earth.'
          }
        ]
      },
      {
        name: 'MATHEMATICS',
        topics: [
          {
            id: 'l4-17',
            num: 17,
            title: 'Algebra Balance Scale',
            desc: 'Equations are shown as a balance. The child adds or removes weights on both sides to solve for x. This teaches the idea of equality in algebra.'
          },
          {
            id: 'l4-18',
            num: 18,
            title: 'Integers & Number Line',
            desc: 'Positive and negative numbers are added, subtracted, and multiplied with a hopping character and a temperature or elevator analogy.'
          },
          {
            id: 'l4-19',
            num: 19,
            title: 'Ratio & Proportion Lab',
            desc: 'Resize recipes, maps, and photos with sliders and see ratios stay equal. This teaches scale and unitary method.'
          },
          {
            id: 'l4-20',
            num: 20,
            title: 'Angles & Triangles Explorer',
            desc: 'Drag triangle vertices to see all three angles and prove they always sum to 180 degrees. Classify triangles by sides and angles.'
          },
          {
            id: 'l4-21',
            num: 21,
            title: 'Area & Volume 3D',
            desc: 'Rotate and unfold cubes, cuboids, cylinders, and prisms to understand surface area and volume formulas.'
          },
          {
            id: 'l4-22',
            num: 22,
            title: 'Percentages, Profit & Loss',
            desc: 'A virtual shop with discounts and price tags to practice real-life calculations.'
          },
          {
            id: 'l4-23',
            num: 23,
            title: 'Statistics Basics',
            desc: 'Mean, median, mode, and range are calculated and displayed on data entered by the learner.'
          }
        ]
      },
      {
        name: 'COMPUTER SCIENCE',
        topics: [
          {
            id: 'l4-24',
            num: 24,
            title: 'Block Coding (Scratch-style)',
            desc: 'Drag and snap blocks to move a character, draw shapes, and use loops and conditions. This teaches computational thinking.'
          },
          {
            id: 'l4-25',
            num: 25,
            title: 'Binary Number Converter',
            desc: 'Flip bits on and off to see the decimal value and convert both ways. This teaches how computers store numbers.'
          },
          {
            id: 'l4-26',
            num: 26,
            title: 'Computer Hardware Explorer',
            desc: 'Click on CPU, RAM, hard disk, and motherboard to see their roles, with an assembly challenge.'
          }
        ]
      }
    ]
  },
  {
    id: 'level-5',
    title: 'LEVEL 5: CLASS 9-10 (Matric / Secondary)',
    goal: 'Support board exam preparation with accurate, formula-based, measurable simulations. Each lab should include variables, live readings, graphs, and a short quiz.',
    subjects: [
      {
        name: 'PHYSICS',
        topics: [
          {
            id: 'l5-1',
            num: 1,
            title: 'Kinematics Lab',
            desc: 'Set initial velocity, acceleration, and time. See the equations of motion applied with live velocity-time and distance-time graphs. This teaches uniform and accelerated motion.'
          },
          {
            id: 'l5-2',
            num: 2,
            title: 'Projectile Motion Simulator',
            desc: 'Change launch angle, speed, and height to see the path, range, maximum height, and time of flight. This teaches 2D motion.'
          },
          {
            id: 'l5-3',
            num: 3,
            title: "Newton's Laws Lab",
            desc: 'Apply forces to carts of different masses with and without friction and see acceleration, action-reaction pairs, and free-body diagrams.'
          },
          {
            id: 'l5-4',
            num: 4,
            title: 'Work, Energy & Power',
            desc: 'A roller-coaster shows kinetic and potential energy converting into each other with bar charts and energy conservation.'
          },
          {
            id: 'l5-5',
            num: 5,
            title: 'Simple Pendulum',
            desc: 'Change length, mass, and angle and measure the time period with a stopwatch. Graph T squared vs L. This teaches how to find g.'
          },
          {
            id: 'l5-6',
            num: 6,
            title: 'Reflection & Refraction',
            desc: "Rays pass through mirrors, glass blocks, and prisms. The lab measures angles and verifies Snell's law and total internal reflection."
          },
          {
            id: 'l5-7',
            num: 7,
            title: 'Lens Ray Diagrams',
            desc: 'Move an object in front of convex and concave lenses and mirrors to see real or virtual, magnified or diminished images, with the lens formula.'
          },
          {
            id: 'l5-8',
            num: 8,
            title: "Ohm's Law & Circuits",
            desc: 'Build circuits with ammeters and voltmeters. Change voltage and resistance, plot a V-I graph, and compare series and parallel resistance.'
          },
          {
            id: 'l5-9',
            num: 9,
            title: 'Electromagnetic Induction',
            desc: 'Move a magnet through a coil or rotate a coil in a field to see induced current and a simple AC generator and transformer.'
          },
          {
            id: 'l5-10',
            num: 10,
            title: 'Radioactivity & Half-Life',
            desc: 'A population of atoms decays randomly. Change the half-life and see the decay curve. This teaches alpha, beta, gamma, and half-life.'
          },
          {
            id: 'l5-11',
            num: 11,
            title: 'Heat & Thermal Expansion',
            desc: 'Heat solids, liquids, and gases and see expansion, specific heat capacity, and heating curves.'
          },
          {
            id: 'l5-12',
            num: 12,
            title: 'Waves & Sound',
            desc: 'Transverse and longitudinal waves with wavelength, frequency, and speed (v = f x lambda), plus echo and resonance tube experiments.'
          }
        ]
      },
      {
        name: 'CHEMISTRY',
        topics: [
          {
            id: 'l5-13',
            num: 13,
            title: 'Periodic Table Trends',
            desc: 'Click any element to see its properties. Graphs compare atomic radius, electronegativity, and ionization energy across periods and groups.'
          },
          {
            id: 'l5-14',
            num: 14,
            title: 'Chemical Bonding (Ionic, Covalent, Metallic)',
            desc: 'Watch electrons transfer or share between atoms to form NaCl, H2O, CH4, and metals. Dot-and-cross diagrams are drawn automatically.'
          },
          {
            id: 'l5-15',
            num: 15,
            title: 'Mole Concept & Stoichiometry Calculator',
            desc: 'Balance chemical equations step by step and convert between mass, moles, particles, and volume.'
          },
          {
            id: 'l5-16',
            num: 16,
            title: "Gas Laws (Boyle's, Charles's, Gay-Lussac's)",
            desc: 'Adjust pressure, volume, and temperature on a piston and see particle behavior and P-V and V-T graphs.'
          },
          {
            id: 'l5-17',
            num: 17,
            title: 'Acid-Base Titration',
            desc: 'A virtual burette, flask, and indicator. Add titrant drop by drop, watch the color change at the end point, and plot the pH curve.'
          },
          {
            id: 'l5-18',
            num: 18,
            title: 'Electrolysis Lab',
            desc: 'Electrolysis of water, brine, and copper sulfate with electrodes. Observe gases and deposits and write the half-equations.'
          },
          {
            id: 'l5-19',
            num: 19,
            title: 'Rates of Reaction',
            desc: 'Change concentration, temperature, surface area, and catalyst, and watch gas production and a rate graph.'
          },
          {
            id: 'l5-20',
            num: 20,
            title: 'Organic Chemistry Basics',
            desc: 'Build alkanes, alkenes, alcohols, and carboxylic acids in rotatable 3D and name them automatically.'
          },
          {
            id: 'l5-21',
            num: 21,
            title: 'Metals, Reactivity Series & Corrosion',
            desc: 'Drop metals into acids and salt solutions and rank them. Test rusting conditions.'
          },
          {
            id: 'l5-22',
            num: 22,
            title: 'Water, Solutions & Solubility',
            desc: 'Dissolve salts at different temperatures and plot solubility curves.'
          }
        ]
      },
      {
        name: 'BIOLOGY',
        topics: [
          {
            id: 'l5-23',
            num: 23,
            title: 'Mitosis & Meiosis Stepper',
            desc: 'Phase-by-phase animation with chromosome tracking and a side-by-side comparison.'
          },
          {
            id: 'l5-24',
            num: 24,
            title: 'DNA Structure & Replication',
            desc: 'Unzip and rebuild the double helix with correct base pairing (A-T, G-C).'
          },
          {
            id: 'l5-25',
            num: 25,
            title: 'Mendelian Genetics (Punnett Square)',
            desc: 'Cross parents with dominant and recessive traits and see genotype and phenotype ratios, including monohybrid and dihybrid crosses.'
          },
          {
            id: 'l5-26',
            num: 26,
            title: 'Human Heart & Blood Circulation',
            desc: 'Interactive chambers, valves, and double circulation with blood flow animation and ECG.'
          },
          {
            id: 'l5-27',
            num: 27,
            title: 'Nervous System & Reflex Arc',
            desc: 'Trace the signal from receptor to brain or spinal cord to effector, with reaction time test.'
          },
          {
            id: 'l5-28',
            num: 28,
            title: 'Osmosis & Diffusion Lab',
            desc: 'Place plant and animal cells in pure water, salt, and sugar solutions and observe swelling, shrinking, and plasmolysis.'
          },
          {
            id: 'l5-29',
            num: 29,
            title: 'Ecosystem & Population Dynamics',
            desc: 'Predator-prey populations with live graphs, carbon and nitrogen cycles.'
          },
          {
            id: 'l5-30',
            num: 30,
            title: 'Digestive Enzymes & Nutrition Tests',
            desc: "Virtual Benedict's, iodine, and biuret tests on different foods."
          },
          {
            id: 'l5-31',
            num: 31,
            title: 'Excretory System & Kidney',
            desc: 'Follow blood through the nephron to see filtration and urine formation.'
          },
          {
            id: 'l5-32',
            num: 32,
            title: 'Plant Tropism & Hormones',
            desc: 'Shine light from different directions and see plant growth responses.'
          }
        ]
      },
      {
        name: 'MATHEMATICS',
        topics: [
          {
            id: 'l5-33',
            num: 33,
            title: 'Quadratic Equation Grapher',
            desc: 'Change a, b, c and watch the parabola, vertex, roots, and discriminant move.'
          },
          {
            id: 'l5-34',
            num: 34,
            title: 'Trigonometry Unit Circle',
            desc: 'Drag a point on the circle to see sine, cosine, and tangent values and graphs form.'
          },
          {
            id: 'l5-35',
            num: 35,
            title: 'Coordinate Geometry Lab',
            desc: 'Plot points and lines, and calculate distance, midpoint, slope, and equation of a line.'
          },
          {
            id: 'l5-36',
            num: 36,
            title: 'Circle Theorems Explorer',
            desc: 'Drag points to verify angle at the center, angles in the same segment, and chord and tangent theorems visually.'
          },
          {
            id: 'l5-37',
            num: 37,
            title: 'Matrices & Determinants Calculator',
            desc: 'Step-by-step addition, multiplication, determinant, and inverse.'
          },
          {
            id: 'l5-38',
            num: 38,
            title: 'Sets, Venn Diagrams & Logarithms',
            desc: 'Drag elements into Venn regions and explore laws of logarithms with graphs.'
          },
          {
            id: 'l5-39',
            num: 39,
            title: 'Algebraic Formulas & Factorization Visualizer',
            desc: 'Area-model proofs of (a+b) squared and difference of squares.'
          }
        ]
      },
      {
        name: 'COMPUTER SCIENCE',
        topics: [
          {
            id: 'l5-40',
            num: 40,
            title: 'Logic Gates Simulator',
            desc: 'Build circuits with AND, OR, NOT, NAND, NOR, XOR and see truth tables and outputs live.'
          },
          {
            id: 'l5-41',
            num: 41,
            title: 'HTML/CSS Live Editor',
            desc: 'Write simple code on one side and see the webpage update instantly on the other.'
          },
          {
            id: 'l5-42',
            num: 42,
            title: 'Number Systems Converter',
            desc: 'Binary, octal, decimal, and hexadecimal conversion with steps.'
          }
        ]
      }
    ]
  },
  {
    id: 'level-6',
    title: 'LEVEL 6: FSc / INTERMEDIATE (Class 11-12)',
    goal: 'Provide university-entry level, concept-deep simulations for Pre-Medical, Pre-Engineering, ICS, and Commerce students, supporting MDCAT, ECAT, and board exams.',
    subjects: [
      {
        name: 'PHYSICS',
        topics: [
          {
            id: 'l6-1',
            num: 1,
            title: 'Vectors & Resultant Lab',
            desc: 'Drag vectors, see components, and find the resultant by head-to-tail and parallelogram methods, plus dot and cross products.'
          },
          {
            id: 'l6-2',
            num: 2,
            title: 'Circular Motion & Centripetal Force',
            desc: 'Change radius, speed, and mass and see centripetal force, banking of roads, and satellite orbits.'
          },
          {
            id: 'l6-3',
            num: 3,
            title: 'Torque & Equilibrium',
            desc: 'Balance beams, ladders, and hanging loads, and verify the conditions of equilibrium.'
          },
          {
            id: 'l6-4',
            num: 4,
            title: 'Fluid Dynamics (Bernoulli & Continuity)',
            desc: "Fluid flows through pipes of changing diameter with pressure and speed readouts. Includes Stokes' law and terminal velocity."
          },
          {
            id: 'l6-5',
            num: 5,
            title: 'Simple Harmonic Motion (Spring-Mass and Pendulum)',
            desc: 'Phase, displacement, velocity, acceleration graphs, and energy exchange.'
          },
          {
            id: 'l6-6',
            num: 6,
            title: "Wave Interference & Young's Double Slit",
            desc: 'Change slit distance and wavelength to see fringes, along with diffraction grating and standing waves.'
          },
          {
            id: 'l6-7',
            num: 7,
            title: 'Thermodynamics (PV Diagrams)',
            desc: 'Isothermal, adiabatic, isobaric, and isochoric processes and the Carnot cycle with efficiency.'
          },
          {
            id: 'l6-8',
            num: 8,
            title: 'Electric Field & Potential',
            desc: "Place positive and negative charges, see field lines, equipotential lines, and force on a test charge. Gauss's law visualizer."
          },
          {
            id: 'l6-9',
            num: 9,
            title: 'Capacitor Charging/Discharging (RC Circuits)',
            desc: 'Real-time voltage and current graphs with an adjustable time constant.'
          },
          {
            id: 'l6-10',
            num: 10,
            title: 'Magnetic Force on Moving Charges',
            desc: 'Charged particles in a magnetic field, cyclotron, velocity selector, and mass spectrometer.'
          },
          {
            id: 'l6-11',
            num: 11,
            title: 'AC Circuits (RLC Resonance)',
            desc: 'Frequency sweep, phasor diagrams, impedance, and resonance peak.'
          },
          {
            id: 'l6-12',
            num: 12,
            title: 'Electromagnetic Waves & Spectrum',
            desc: 'Wave generation and the electromagnetic spectrum with applications.'
          },
          {
            id: 'l6-13',
            num: 13,
            title: 'Photoelectric Effect',
            desc: 'Change light frequency, intensity, and metal to see electron ejection, threshold frequency, and stopping potential.'
          },
          {
            id: 'l6-14',
            num: 14,
            title: 'Bohr Atom & Spectral Lines',
            desc: 'Electron jumps between orbits, emission and absorption spectra of hydrogen.'
          },
          {
            id: 'l6-15',
            num: 15,
            title: 'Semiconductors, Diodes & Transistors',
            desc: 'Forward and reverse bias, half- and full-wave rectifiers, and a transistor as a switch and amplifier.'
          },
          {
            id: 'l6-16',
            num: 16,
            title: 'Nuclear Physics',
            desc: 'Binding energy, fission, and fusion chain reactions.'
          },
          {
            id: 'l6-17',
            num: 17,
            title: 'Oscillations, Damping & Resonance',
            desc: 'Damped and driven oscillators with adjustable damping.'
          }
        ]
      },
      {
        name: 'CHEMISTRY',
        topics: [
          {
            id: 'l6-18',
            num: 18,
            title: 'Atomic Orbitals 3D (s, p, d)',
            desc: 'Rotatable orbital shapes with quantum numbers and electron configuration filling (Aufbau, Pauli, Hund).'
          },
          {
            id: 'l6-19',
            num: 19,
            title: "Chemical Equilibrium & Le Chatelier's Principle",
            desc: 'Change concentration, pressure, or temperature and see the system shift and Kc change.'
          },
          {
            id: 'l6-20',
            num: 20,
            title: 'Buffer Solutions & pH Calculator',
            desc: 'Henderson-Hasselbalch visualization and buffer capacity.'
          },
          {
            id: 'l6-21',
            num: 21,
            title: 'Electrochemical Cells',
            desc: 'Galvanic cell with salt bridge, electrode potentials, EMF calculation, and Nernst equation.'
          },
          {
            id: 'l6-22',
            num: 22,
            title: 'Thermochemistry (Enthalpy Diagrams)',
            desc: "Exothermic and endothermic energy profiles, Hess's law, and bond energies."
          },
          {
            id: 'l6-23',
            num: 23,
            title: 'Reaction Kinetics (Order & Rate Law)',
            desc: 'Concentration-time graphs, half-life, activation energy, and Arrhenius plot.'
          },
          {
            id: 'l6-24',
            num: 24,
            title: 'Organic Reaction Mechanisms',
            desc: 'Substitution (SN1, SN2), addition, and elimination with curved-arrow electron flow.'
          },
          {
            id: 'l6-25',
            num: 25,
            title: 'Colligative Properties',
            desc: 'Boiling point elevation, freezing point depression, osmotic pressure, and vapor pressure lowering.'
          },
          {
            id: 'l6-26',
            num: 26,
            title: 'Qualitative Salt Analysis',
            desc: 'Add virtual reagents to identify cations and anions with precipitate colors and flame tests.'
          },
          {
            id: 'l6-27',
            num: 27,
            title: 'Molecular Geometry (VSEPR) & Hybridization',
            desc: 'Rotatable 3D molecules showing bond angles and sp, sp2, sp3 hybridization.'
          },
          {
            id: 'l6-28',
            num: 28,
            title: 'Chemical Kinetics of Gases & Kinetic Molecular Theory',
            desc: 'Particle speed distribution (Maxwell-Boltzmann) with temperature control.'
          },
          {
            id: 'l6-29',
            num: 29,
            title: 'Solutions, Ionic Equilibria & Solubility Product',
            desc: 'Ksp, common-ion effect, and precipitation prediction.'
          },
          {
            id: 'l6-30',
            num: 30,
            title: 'Biochemistry & Polymers',
            desc: 'Build amino acids, proteins, carbohydrates, and polymer chains.'
          }
        ]
      },
      {
        name: 'BIOLOGY',
        topics: [
          {
            id: 'l6-31',
            num: 31,
            title: 'Photosynthesis (Light & Dark Reactions)',
            desc: 'Interactive photosystems and the Calvin cycle with inputs and outputs.'
          },
          {
            id: 'l6-32',
            num: 32,
            title: 'Cellular Respiration & ATP',
            desc: 'Glycolysis, Krebs cycle, and electron transport chain with ATP count.'
          },
          {
            id: 'l6-33',
            num: 33,
            title: 'Protein Synthesis (Transcription & Translation)',
            desc: 'Build mRNA, then assemble a protein codon by codon using the codon table.'
          },
          {
            id: 'l6-34',
            num: 34,
            title: 'Human Reproduction & Embryo Development',
            desc: 'Staged animations of gametogenesis, fertilization, and fetal development.'
          },
          {
            id: 'l6-35',
            num: 35,
            title: 'Enzyme Activity Lab',
            desc: 'Change pH, temperature, and substrate concentration and see the rate curve, inhibitors, and the lock-and-key model.'
          },
          {
            id: 'l6-36',
            num: 36,
            title: 'Natural Selection & Evolution Simulator',
            desc: 'Run generations with changing environments and watch traits shift, with Hardy-Weinberg calculator.'
          },
          {
            id: 'l6-37',
            num: 37,
            title: 'Plant Transpiration & Water Transport',
            desc: 'Vary humidity, light, and wind and measure water loss and xylem flow.'
          },
          {
            id: 'l6-38',
            num: 38,
            title: 'Human Nervous Impulse & Synapse',
            desc: 'Action potential graph, ion channels, and neurotransmitter release.'
          },
          {
            id: 'l6-39',
            num: 39,
            title: 'Immunity, Hormones & Homeostasis',
            desc: 'Feedback loops for blood sugar, temperature, and antibody response.'
          },
          {
            id: 'l6-40',
            num: 40,
            title: 'Biotechnology & Genetic Engineering',
            desc: 'Virtual gel electrophoresis, PCR, and gene cloning steps.'
          },
          {
            id: 'l6-41',
            num: 41,
            title: 'Classification & Biodiversity Explorer',
            desc: 'Interactive taxonomy tree from kingdom to species.'
          }
        ]
      },
      {
        name: 'MATHEMATICS',
        topics: [
          {
            id: 'l6-42',
            num: 42,
            title: 'Calculus: Limits & Derivatives',
            desc: 'Slide a tangent along a curve to see slope as a derivative and watch limit behavior.'
          },
          {
            id: 'l6-43',
            num: 43,
            title: 'Integration (Area Under Curve)',
            desc: 'Riemann sums with adjustable rectangles that converge to the exact integral.'
          },
          {
            id: 'l6-44',
            num: 44,
            title: 'Conic Sections Explorer',
            desc: 'Slice a cone to produce a circle, ellipse, parabola, and hyperbola, and change eccentricity.'
          },
          {
            id: 'l6-45',
            num: 45,
            title: 'Complex Numbers on the Argand Plane',
            desc: 'Add, multiply, and rotate complex numbers with modulus and argument.'
          },
          {
            id: 'l6-46',
            num: 46,
            title: 'Permutations & Combinations',
            desc: 'Interactive arrangement and selection with counting trees.'
          },
          {
            id: 'l6-47',
            num: 47,
            title: 'Probability & Statistics Lab',
            desc: 'Dice, coins, cards, binomial and normal distribution, standard deviation, and regression line.'
          },
          {
            id: 'l6-48',
            num: 48,
            title: 'Sequences, Series & Binomial Theorem',
            desc: "Visualize arithmetic, geometric series, convergence, and Pascal's triangle."
          },
          {
            id: 'l6-49',
            num: 49,
            title: 'Vectors in 3D & Planes',
            desc: 'Rotatable 3D axes for lines, planes, and angle between vectors.'
          },
          {
            id: 'l6-50',
            num: 50,
            title: 'Differential Equations & Functions Grapher',
            desc: 'Plot any function, its derivative, and its inverse.'
          }
        ]
      },
      {
        name: 'COMPUTER SCIENCE (ICS)',
        topics: [
          {
            id: 'l6-51',
            num: 51,
            title: 'Sorting Algorithm Visualizer',
            desc: 'Bubble, selection, insertion, merge, and quick sort animated with step counts.'
          },
          {
            id: 'l6-52',
            num: 52,
            title: 'Python / C++ Code Playground',
            desc: 'Write and run small programs in the browser with example challenges.'
          },
          {
            id: 'l6-53',
            num: 53,
            title: 'Database & SQL Query Practice',
            desc: 'Run SELECT, JOIN, and GROUP BY queries on sample tables and see results.'
          },
          {
            id: 'l6-54',
            num: 54,
            title: 'Networking Basics (OSI Model & TCP/IP)',
            desc: 'Follow a data packet through the layers and see IP addressing and subnetting.'
          },
          {
            id: 'l6-55',
            num: 55,
            title: 'Data Structures Visualizer',
            desc: 'Stack, queue, linked list, and tree operations step by step.'
          },
          {
            id: 'l6-56',
            num: 56,
            title: 'Boolean Algebra & Karnaugh Maps',
            desc: 'Simplify expressions and see equivalent circuits.'
          }
        ]
      },
      {
        name: 'COMMERCE AND ECONOMICS (FA / I.Com)',
        topics: [
          {
            id: 'l6-57',
            num: 57,
            title: 'Supply & Demand Curve',
            desc: 'Shift curves with sliders to see equilibrium price and quantity change.'
          },
          {
            id: 'l6-58',
            num: 58,
            title: 'Ledger, Trial Balance & Balance Sheet Builder',
            desc: 'Enter transactions and see accounts update automatically.'
          },
          {
            id: 'l6-59',
            num: 59,
            title: 'Profit, Cost & Break-Even Analysis',
            desc: 'Change costs and prices and see the break-even point on a graph.'
          }
        ]
      }
    ]
  }
];

const CROSS_LEVEL_TOPICS = [
  {
    name: 'Geography',
    desc: 'Plate tectonics, earthquake and volcano simulators, climate and monsoon maps, river systems, and world map quiz.'
  },
  {
    name: 'Pakistan Studies & History',
    desc: 'An interactive timeline from the Indus Valley Civilization to the Pakistan Movement and independence, with maps of key events and leaders.'
  },
  {
    name: 'Islamiat',
    desc: 'Prayer times and Qibla direction finder, step-by-step Hajj and Umrah guide, Wudu and Salah steps, and an Islamic (Hijri) calendar converter.'
  },
  {
    name: 'English Language',
    desc: 'Grammar sorter (parts of speech), tenses timeline, sentence builder, spelling games, and pronunciation practice.'
  },
  {
    name: 'Urdu Language',
    desc: 'Haroof-e-Tahajji tracing, Urdu grammar drills, and a poetry meter (behar) visualizer.'
  },
  {
    name: 'General Knowledge & Current Affairs',
    desc: 'Quiz games on countries, flags, capitals, scientists, and inventions.'
  },
  {
    name: 'Environmental Science',
    desc: 'Pollution, climate change, greenhouse effect, and renewable energy simulators.'
  }
];

const DESIGN_STANDARDS = [
  'Runs directly in the browser with no installation, and works smoothly on mobile, tablet, and desktop.',
  'Has adjustable controls (sliders, buttons, drag and drop) and gives instant visual feedback.',
  'Includes clear learning objectives, a short theory panel, a "Try it yourself" experiment, and a short quiz with answers.',
  'Is aligned with the National Curriculum of Pakistan and with the textbooks of the Punjab, Sindh, KPK, and Balochistan boards.',
  'Offers an English and Urdu language toggle where possible.',
  'Uses safe, age-appropriate content, clear fonts, and good color contrast for accessibility.',
  'Can be opened and shared using a single link, so teachers can use it in class and students can practice at home.'
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
    'cross-level': true,
    'standards': true
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
      'cross-level': nextState,
      'standards': nextState
    });
  };

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase().trim());
  };

  return (
    <section 
      aria-label="Simulation Roadmap"
      className="gz-roadmap-section w-full my-6 sm:my-8 rounded-2xl border border-slate-300 shadow-sm relative z-10 transition-all font-sans"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#111827'
      }}
    >
      <div className="p-6 sm:p-10 lg:p-12 space-y-8 bg-white text-black">
        
        {/* Section Header */}
        <div className="space-y-4 border-b border-slate-300 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded border border-slate-300">
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

          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
            Gen Z Interactive Simulations is built to cover every subject of the Pakistani curriculum, from Play Group all the way to FSc (Intermediate, Class 11-12). The list below is the complete roadmap of interactive simulations that can be created for each level. Every topic includes a clear explanation of what the simulation should do, what the learner can control, and what the learner will understand by using it. Any teacher, student, or developer who opens this portal can use these descriptions as a blueprint to build, extend, or request a new simulation. Every simulation is designed to run directly in a web browser, with no installation, on mobile, tablet, and computer.
          </p>
        </div>

        {/* Grade-Level Roadmap Blocks (Plain text, no cards or nested boxes) */}
        <div className="space-y-10">
          {ROADMAP_LEVELS.map((level) => {
            const isExpanded = !!expandedBlocks[level.id];

            const filteredSubjects = level.subjects.map((sub) => ({
              ...sub,
              topics: sub.topics.filter(
                (t) => matchesSearch(t.title) || matchesSearch(t.desc) || (sub.name && matchesSearch(sub.name))
              )
            })).filter((sub) => sub.topics.length > 0);

            if (searchQuery.trim() && filteredSubjects.length === 0) {
              return null;
            }

            return (
              <div key={level.id} className="border-b border-slate-200 pb-8 last:border-b-0">
                {/* Level Heading */}
                <div 
                  className="flex items-center justify-between gap-3 cursor-pointer select-none pb-2"
                  onClick={() => toggleBlock(level.id)}
                >
                  <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-wide">
                    {level.title}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBlock(level.id);
                    }}
                    className="p-1 rounded text-slate-700 hover:text-black hover:bg-slate-100 transition-colors"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-3 space-y-4">
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      <strong className="text-black font-bold">Goal:</strong> {level.goal}
                    </p>

                    <div className="space-y-6 pt-2">
                      {filteredSubjects.map((sub, sIdx) => (
                        <div key={`${level.id}-sub-${sIdx}`} className="space-y-3">
                          {sub.name && (
                            <h4 className="text-sm font-black text-black uppercase tracking-wider pt-2 border-b border-slate-200 pb-1">
                              {sub.name}
                            </h4>
                          )}

                          <ol className="space-y-3 pl-0 list-none">
                            {sub.topics.map((t) => (
                              <li key={t.id} className="text-sm sm:text-[15px] leading-relaxed text-slate-900">
                                <strong className="text-black font-bold">{t.num}. {t.title}:</strong> {t.desc}
                              </li>
                            ))}
                          </ol>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* CROSS-LEVEL SUBJECTS */}
          {(!searchQuery.trim() || CROSS_LEVEL_TOPICS.some(t => matchesSearch(t.name) || matchesSearch(t.desc))) && (
            <div className="border-b border-slate-200 pb-8 last:border-b-0">
              <div 
                className="flex items-center justify-between gap-3 cursor-pointer select-none pb-2"
                onClick={() => toggleBlock('cross-level')}
              >
                <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-wide">
                  CROSS-LEVEL SUBJECTS
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBlock('cross-level');
                  }}
                  className="p-1 rounded text-slate-700 hover:text-black hover:bg-slate-100 transition-colors"
                  aria-label={expandedBlocks['cross-level'] ? 'Collapse' : 'Expand'}
                >
                  {expandedBlocks['cross-level'] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {expandedBlocks['cross-level'] && (
                <div className="mt-3 space-y-3">
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    These subjects can be used at multiple levels with difficulty adjusted by class.
                  </p>
                  <ul className="space-y-2.5 pl-5 list-disc text-sm sm:text-[15px] text-slate-900 leading-relaxed">
                    {CROSS_LEVEL_TOPICS
                      .filter((t) => matchesSearch(t.name) || matchesSearch(t.desc))
                      .map((t, idx) => (
                        <li key={`cross-${idx}`}>
                          <strong className="text-black font-bold">{t.name}:</strong> {t.desc}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* DESIGN STANDARDS FOR EVERY SIMULATION */}
          {(!searchQuery.trim() || DESIGN_STANDARDS.some(s => matchesSearch(s))) && (
            <div className="pb-4">
              <div 
                className="flex items-center justify-between gap-3 cursor-pointer select-none pb-2"
                onClick={() => toggleBlock('standards')}
              >
                <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-wide">
                  DESIGN STANDARDS FOR EVERY SIMULATION
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBlock('standards');
                  }}
                  className="p-1 rounded text-slate-700 hover:text-black hover:bg-slate-100 transition-colors"
                  aria-label={expandedBlocks['standards'] ? 'Collapse' : 'Expand'}
                >
                  {expandedBlocks['standards'] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {expandedBlocks['standards'] && (
                <div className="mt-3 space-y-2">
                  <ul className="space-y-2 pl-5 list-disc text-sm sm:text-[15px] text-slate-900 leading-relaxed">
                    {DESIGN_STANDARDS
                      .filter((s) => matchesSearch(s))
                      .map((s, idx) => (
                        <li key={`std-${idx}`}>
                          {s}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
