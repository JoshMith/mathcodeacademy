// Lesson content database
export interface LessonSection {
  type: "text" | "concept" | "math" | "code" | "example";
  title?: string;
  content?: string;
  formula?: string;
  language?: string;
  code?: string;
  problem?: string;
  solution?: string;
}

export interface PracticeQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export interface LessonContent {
  title: string;
  duration: string;
  xpReward: number;
  objectives: string[];
  sections: LessonSection[];
  practices: PracticeQuestion[];
}

export interface LessonMetadata {
  id: string;
  title: string;
  duration: string;
  trackId: string;
  moduleId: string;
  trackTitle: string;
}

// All lessons with their full lesson path as key
export const lessonsData: Record<string, LessonContent> = {
  // Foundation Track - Number Systems
  "foundation/number-systems/binary-intro": {
    title: "Introduction to Binary",
    duration: "15 min",
    xpReward: 100,
    objectives: [
      "Understand what binary number system is",
      "Convert between binary and decimal",
      "Understand why computers use binary",
    ],
    sections: [
      {
        type: "text",
        content: `Binary is a base-2 number system that uses only two digits: 0 and 1. It's the fundamental language that all computers speak, representing data and instructions at the most basic level.`,
      },
      {
        type: "concept",
        title: "Why Binary?",
        content: `Computers use binary because electronic circuits have two stable states: on (1) and off (0). This makes binary the most reliable and efficient way to store and process information electronically.`,
      },
      {
        type: "math",
        title: "Binary to Decimal Conversion",
        content: `Each position in a binary number represents a power of 2. To convert binary to decimal, multiply each digit by its position value and sum the results.`,
        formula: "1011_2 = 1 \\times 2^3 + 0 \\times 2^2 + 1 \\times 2^1 + 1 \\times 2^0 = 8 + 0 + 2 + 1 = 11_{10}",
      },
      {
        type: "code",
        title: "Binary Conversion in Python",
        language: "python",
        code: `# Convert decimal to binary
decimal_num = 11
binary_str = bin(decimal_num)  # Returns '0b1011'
print(f"{decimal_num} in binary is {binary_str[2:]}")

# Convert binary to decimal
binary_str = "1011"
decimal_num = int(binary_str, 2)  # Returns 11
print(f"Binary 1011 is {decimal_num} in decimal")`,
      },
      {
        type: "example",
        title: "Worked Example",
        problem: "Convert the binary number 11010 to decimal.",
        solution: `Starting from the rightmost digit:
• Position 0: 0 × 2⁰ = 0
• Position 1: 1 × 2¹ = 2  
• Position 2: 0 × 2² = 0
• Position 3: 1 × 2³ = 8
• Position 4: 1 × 2⁴ = 16

Sum: 0 + 2 + 0 + 8 + 16 = 26`,
        formula: "11010_2 = 26_{10}",
      },
    ],
    practices: [
      { id: 1, question: "What is 1100 in decimal?", options: ["10", "12", "14", "16"], correct: 1 },
      { id: 2, question: "What is 13 in binary?", options: ["1011", "1100", "1101", "1110"], correct: 2 },
      { id: 3, question: "How many bits are needed to represent the number 64?", options: ["5", "6", "7", "8"], correct: 2 },
    ],
  },

  "foundation/number-systems/binary-arithmetic": {
    title: "Binary Arithmetic",
    duration: "20 min",
    xpReward: 120,
    objectives: [
      "Perform addition and subtraction in binary",
      "Understand binary overflow",
      "Apply two's complement for negative numbers",
    ],
    sections: [
      {
        type: "text",
        content: `Binary arithmetic follows the same rules as decimal arithmetic, but with only two digits. Understanding these operations is essential for low-level programming and computer architecture.`,
      },
      {
        type: "concept",
        title: "Binary Addition Rules",
        content: `In binary addition: 0+0=0, 0+1=1, 1+0=1, and 1+1=10 (which is 0 with a carry of 1). When adding 1+1+1, the result is 11 (1 with a carry of 1).`,
      },
      {
        type: "math",
        title: "Binary Addition Example",
        content: `Let's add 1011 (11) and 0110 (6):`,
        formula: "\\begin{aligned} &\\phantom{+}1011 \\\\ &+0110 \\\\ \\hline &10001 \\end{aligned} = 17_{10}",
      },
      {
        type: "concept",
        title: "Two's Complement",
        content: `Two's complement is the standard way to represent negative numbers in binary. To get the two's complement: invert all bits, then add 1. For example, -5 in 8-bit two's complement: 5 = 00000101, inverted = 11111010, add 1 = 11111011.`,
      },
      {
        type: "code",
        title: "Binary Arithmetic in Python",
        language: "python",
        code: `# Binary addition
a = 0b1011  # 11
b = 0b0110  # 6
result = a + b
print(f"{bin(a)} + {bin(b)} = {bin(result)}")  # 0b10001 = 17

# Two's complement (for 8-bit representation)
def twos_complement(n, bits=8):
    if n >= 0:
        return n
    return (1 << bits) + n

print(twos_complement(-5))  # 251 (11111011 in binary)`,
      },
    ],
    practices: [
      { id: 1, question: "What is 1010 + 0101 in binary?", options: ["1100", "1111", "10000", "1110"], correct: 1 },
      { id: 2, question: "What is 1+1+1 in binary?", options: ["10", "11", "100", "111"], correct: 1 },
      { id: 3, question: "In 4-bit two's complement, what represents -1?", options: ["0001", "1000", "1110", "1111"], correct: 3 },
    ],
  },

  "foundation/number-systems/hexadecimal": {
    title: "Hexadecimal & Octal Systems",
    duration: "18 min",
    xpReward: 110,
    objectives: [
      "Understand hexadecimal (base-16) notation",
      "Convert between hex, binary, and decimal",
      "Recognize common uses of hexadecimal in programming",
    ],
    sections: [
      {
        type: "text",
        content: `Hexadecimal (hex) uses 16 digits: 0-9 and A-F, where A=10, B=11, C=12, D=13, E=14, F=15. It's commonly used in programming because each hex digit represents exactly 4 binary bits, making conversions simple.`,
      },
      {
        type: "concept",
        title: "Why Hexadecimal?",
        content: `Hexadecimal is popular in computing because it's a compact way to represent binary data. One byte (8 bits) can be written as exactly 2 hex digits, making memory addresses and color codes much easier to read.`,
      },
      {
        type: "math",
        title: "Hex to Decimal Conversion",
        content: `Each hex position represents a power of 16.`,
        formula: "2F_{16} = 2 \\times 16^1 + 15 \\times 16^0 = 32 + 15 = 47_{10}",
      },
      {
        type: "code",
        title: "Hexadecimal in Programming",
        language: "python",
        code: `# Hex in Python
hex_num = 0x2F  # 47 in decimal
print(f"0x2F = {hex_num}")

# Colors in CSS/web (RGB)
red = 0xFF0000    # Pure red
green = 0x00FF00  # Pure green
blue = 0x0000FF   # Pure blue

# Memory addresses
address = 0x7FFF5FBFF8AC
print(f"Memory address: {hex(address)}")`,
      },
      {
        type: "example",
        title: "Binary to Hex Conversion",
        problem: "Convert binary 11010110 to hexadecimal.",
        solution: `Group into 4-bit nibbles from right:
• 1101 = D (13)
• 0110 = 6

Therefore: 11010110₂ = D6₁₆`,
        formula: "11010110_2 = D6_{16}",
      },
    ],
    practices: [
      { id: 1, question: "What is 0xFF in decimal?", options: ["15", "16", "255", "256"], correct: 2 },
      { id: 2, question: "What is binary 1010 in hex?", options: ["A", "B", "10", "1A"], correct: 0 },
      { id: 3, question: "How many hex digits represent one byte?", options: ["1", "2", "4", "8"], correct: 1 },
    ],
  },

  "foundation/number-systems/floating-point": {
    title: "Floating Point Representation",
    duration: "25 min",
    xpReward: 130,
    objectives: [
      "Understand IEEE 754 floating point format",
      "Recognize precision limitations in floating point",
      "Avoid common floating point errors in code",
    ],
    sections: [
      {
        type: "text",
        content: `Floating point numbers represent real numbers in computers using scientific notation. The IEEE 754 standard defines how these numbers are stored, with separate fields for sign, exponent, and mantissa.`,
      },
      {
        type: "concept",
        title: "IEEE 754 Structure",
        content: `A 32-bit float has: 1 sign bit (0=positive), 8 exponent bits (biased by 127), and 23 mantissa bits (the fractional part after 1.). This allows representing very large and very small numbers.`,
      },
      {
        type: "math",
        title: "Floating Point Formula",
        content: `The value is calculated as:`,
        formula: "(-1)^{sign} \\times 1.mantissa \\times 2^{exponent - 127}",
      },
      {
        type: "concept",
        title: "Precision Problems",
        content: `Not all decimal numbers can be exactly represented in binary floating point. For example, 0.1 in decimal is a repeating fraction in binary, leading to small errors that can accumulate.`,
      },
      {
        type: "code",
        title: "Floating Point Gotchas",
        language: "python",
        code: `# Classic floating point issue
print(0.1 + 0.2)  # 0.30000000000000004, not 0.3!

# Comparing floats safely
import math
a = 0.1 + 0.2
b = 0.3
print(math.isclose(a, b))  # True

# For financial calculations, use Decimal
from decimal import Decimal
price = Decimal('19.99')
tax = Decimal('0.08')
total = price * (1 + tax)
print(total)  # 21.5892`,
      },
    ],
    practices: [
      { id: 1, question: "How many bits is the sign field in IEEE 754 single precision?", options: ["1", "8", "23", "32"], correct: 0 },
      { id: 2, question: "Why is 0.1 + 0.2 not exactly 0.3 in floating point?", options: ["Rounding error", "Binary representation", "Integer overflow", "Type coercion"], correct: 1 },
      { id: 3, question: "What's the bias for single precision exponent?", options: ["63", "127", "255", "1023"], correct: 1 },
    ],
  },

  // Foundation Track - Boolean Algebra
  "foundation/boolean-algebra/logic-gates": {
    title: "Logic Gates Fundamentals",
    duration: "20 min",
    xpReward: 100,
    objectives: [
      "Understand the basic logic gates (AND, OR, NOT, XOR)",
      "Read and interpret logic gate diagrams",
      "Apply logic gates to solve problems",
    ],
    sections: [
      {
        type: "text",
        content: `Logic gates are the fundamental building blocks of digital circuits. They take binary inputs and produce binary outputs based on specific rules. Every computer operation, from simple addition to complex AI, is built from these basic gates.`,
      },
      {
        type: "concept",
        title: "The Basic Gates",
        content: `AND: outputs 1 only if ALL inputs are 1. OR: outputs 1 if ANY input is 1. NOT: inverts the input. XOR: outputs 1 if inputs are DIFFERENT.`,
      },
      {
        type: "math",
        title: "Boolean Expressions",
        content: `Gates can be represented mathematically:`,
        formula: "AND: A \\cdot B \\quad OR: A + B \\quad NOT: \\overline{A} \\quad XOR: A \\oplus B",
      },
      {
        type: "code",
        title: "Logic Operations in Python",
        language: "python",
        code: `# Bitwise operations
a = 0b1010
b = 0b1100

print(f"AND: {bin(a & b)}")   # 0b1000
print(f"OR: {bin(a | b)}")    # 0b1110
print(f"XOR: {bin(a ^ b)}")   # 0b0110
print(f"NOT a: {bin(~a)}")    # Inverts all bits`,
      },
    ],
    practices: [
      { id: 1, question: "What is 1 AND 0?", options: ["0", "1", "undefined", "error"], correct: 0 },
      { id: 2, question: "What is 1 XOR 1?", options: ["0", "1", "2", "undefined"], correct: 0 },
      { id: 3, question: "Which gate outputs 1 when at least one input is 1?", options: ["AND", "OR", "NOT", "NAND"], correct: 1 },
    ],
  },

  "foundation/boolean-algebra/truth-tables": {
    title: "Truth Tables & Expressions",
    duration: "22 min",
    xpReward: 110,
    objectives: [
      "Construct truth tables for complex expressions",
      "Convert between truth tables and boolean expressions",
      "Simplify expressions using truth tables",
    ],
    sections: [
      {
        type: "text",
        content: `Truth tables systematically list all possible input combinations and their corresponding outputs. They're essential for analyzing and designing digital circuits.`,
      },
      {
        type: "concept",
        title: "Building Truth Tables",
        content: `For n input variables, a truth table has 2ⁿ rows. Each row represents one possible combination of inputs. Start with all 0s and count up in binary.`,
      },
      {
        type: "example",
        title: "Example: A AND (B OR C)",
        problem: "Create a truth table for the expression A · (B + C)",
        solution: `A | B | C | B+C | A·(B+C)
0 | 0 | 0 |  0  |   0
0 | 0 | 1 |  1  |   0
0 | 1 | 0 |  1  |   0
0 | 1 | 1 |  1  |   0
1 | 0 | 0 |  0  |   0
1 | 0 | 1 |  1  |   1
1 | 1 | 0 |  1  |   1
1 | 1 | 1 |  1  |   1`,
        formula: "A \\cdot (B + C)",
      },
    ],
    practices: [
      { id: 1, question: "How many rows in a truth table with 4 variables?", options: ["4", "8", "16", "32"], correct: 2 },
      { id: 2, question: "In a truth table, how is 'false' typically represented?", options: ["F", "0", "N", "false"], correct: 1 },
      { id: 3, question: "What is NOT (A AND B) called?", options: ["NOR", "NAND", "XOR", "XNOR"], correct: 1 },
    ],
  },

  "foundation/boolean-algebra/boolean-laws": {
    title: "Boolean Laws & Simplification",
    duration: "25 min",
    xpReward: 130,
    objectives: [
      "Apply De Morgan's laws",
      "Simplify boolean expressions using algebraic rules",
      "Recognize common boolean identities",
    ],
    sections: [
      {
        type: "text",
        content: `Boolean algebra has laws that help simplify complex expressions. These laws are essential for optimizing digital circuits and writing efficient conditional logic in code.`,
      },
      {
        type: "math",
        title: "De Morgan's Laws",
        content: `These powerful laws show how to distribute NOT over AND/OR:`,
        formula: "\\overline{A \\cdot B} = \\overline{A} + \\overline{B} \\quad \\overline{A + B} = \\overline{A} \\cdot \\overline{B}",
      },
      {
        type: "concept",
        title: "Key Boolean Identities",
        content: `Identity: A·1=A, A+0=A. Null: A·0=0, A+1=1. Idempotent: A·A=A, A+A=A. Complement: A·Ā=0, A+Ā=1. These form the foundation of simplification.`,
      },
      {
        type: "code",
        title: "Applying De Morgan's in Code",
        language: "python",
        code: `# De Morgan's law in practice
# Instead of: not (a and b)
# Use: (not a) or (not b)

def check_valid(x, y):
    # These are equivalent:
    # return not (x > 0 and y > 0)
    return x <= 0 or y <= 0  # Clearer logic`,
      },
    ],
    practices: [
      { id: 1, question: "What is NOT(A OR B) equivalent to?", options: ["NOT A OR NOT B", "NOT A AND NOT B", "A AND B", "A OR B"], correct: 1 },
      { id: 2, question: "What is A OR 1?", options: ["A", "1", "0", "NOT A"], correct: 1 },
      { id: 3, question: "Simplify: A AND (A OR B)", options: ["A", "B", "A AND B", "A OR B"], correct: 0 },
    ],
  },

  "foundation/boolean-algebra/circuit-design": {
    title: "Digital Circuit Design",
    duration: "30 min",
    xpReward: 150,
    objectives: [
      "Design circuits from boolean expressions",
      "Minimize gates using Karnaugh maps",
      "Build practical circuits like adders",
    ],
    sections: [
      {
        type: "text",
        content: `Digital circuit design combines boolean algebra with practical engineering. The goal is to implement a desired function using the minimum number of logic gates, reducing cost and power consumption.`,
      },
      {
        type: "concept",
        title: "Half Adder",
        content: `A half adder adds two 1-bit numbers. It needs two outputs: Sum (XOR of inputs) and Carry (AND of inputs). This is the building block for larger adders.`,
      },
      {
        type: "math",
        title: "Half Adder Equations",
        content: `For inputs A and B:`,
        formula: "Sum = A \\oplus B \\quad Carry = A \\cdot B",
      },
      {
        type: "code",
        title: "Simulating a Half Adder",
        language: "python",
        code: `def half_adder(a, b):
    sum_bit = a ^ b  # XOR
    carry = a & b    # AND
    return sum_bit, carry

# Test all inputs
for a in [0, 1]:
    for b in [0, 1]:
        s, c = half_adder(a, b)
        print(f"{a} + {b} = {c}{s}")  # carry,sum`,
      },
    ],
    practices: [
      { id: 1, question: "What gate produces the 'sum' in a half adder?", options: ["AND", "OR", "XOR", "NAND"], correct: 2 },
      { id: 2, question: "How many outputs does a full adder have?", options: ["1", "2", "3", "4"], correct: 1 },
      { id: 3, question: "A Karnaugh map helps with what?", options: ["Adding numbers", "Simplifying expressions", "Memory storage", "Timing circuits"], correct: 1 },
    ],
  },

  // Foundation Track - Set Theory
  "foundation/set-theory/sets-intro": {
    title: "Introduction to Sets",
    duration: "15 min",
    xpReward: 100,
    objectives: [
      "Define sets and set notation",
      "Understand membership and subsets",
      "Recognize set builder notation",
    ],
    sections: [
      {
        type: "text",
        content: `A set is a collection of distinct objects. In programming, sets are fundamental for managing collections of unique items, database operations, and algorithm design.`,
      },
      {
        type: "math",
        title: "Set Notation",
        content: `Sets are denoted with curly braces. Membership uses ∈:`,
        formula: "A = \\{1, 2, 3\\} \\quad 2 \\in A \\quad 5 \\notin A",
      },
      {
        type: "code",
        title: "Sets in Python",
        language: "python",
        code: `# Creating sets
numbers = {1, 2, 3, 4, 5}
letters = set(['a', 'b', 'c'])

# Membership testing (O(1) average)
print(3 in numbers)  # True
print('d' in letters)  # False

# Sets automatically remove duplicates
unique = {1, 2, 2, 3, 3, 3}
print(unique)  # {1, 2, 3}`,
      },
    ],
    practices: [
      { id: 1, question: "What does {1, 2, 2, 3} simplify to?", options: ["{1, 2, 2, 3}", "{1, 2, 3}", "{1, 3}", "Error"], correct: 1 },
      { id: 2, question: "What symbol means 'is a member of'?", options: ["⊆", "∈", "∪", "∩"], correct: 1 },
      { id: 3, question: "Is the empty set a subset of every set?", options: ["Yes", "No", "Only infinite sets", "Only non-empty sets"], correct: 0 },
    ],
  },

  "foundation/set-theory/set-operations": {
    title: "Set Operations",
    duration: "20 min",
    xpReward: 110,
    objectives: [
      "Perform union, intersection, and difference",
      "Understand symmetric difference",
      "Apply set operations in programming",
    ],
    sections: [
      {
        type: "text",
        content: `Set operations combine or compare sets in useful ways. These operations are the foundation of SQL JOINs, data filtering, and many algorithms.`,
      },
      {
        type: "math",
        title: "Core Operations",
        content: `The main set operations:`,
        formula: "A \\cup B \\text{ (union)} \\quad A \\cap B \\text{ (intersection)} \\quad A - B \\text{ (difference)}",
      },
      {
        type: "code",
        title: "Set Operations in Python",
        language: "python",
        code: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)  # Union: {1, 2, 3, 4, 5, 6}
print(a & b)  # Intersection: {3, 4}
print(a - b)  # Difference: {1, 2}
print(a ^ b)  # Symmetric diff: {1, 2, 5, 6}`,
      },
    ],
    practices: [
      { id: 1, question: "What is {1,2,3} ∩ {2,3,4}?", options: ["{1,2,3,4}", "{2,3}", "{1,4}", "{}"], correct: 1 },
      { id: 2, question: "What is {1,2} ∪ {3,4}?", options: ["{}", "{1,2,3,4}", "{1,4}", "{2,3}"], correct: 1 },
      { id: 3, question: "A - B contains elements that are:", options: ["In both A and B", "In A but not B", "In B but not A", "In neither"], correct: 1 },
    ],
  },

  "foundation/set-theory/relations": {
    title: "Relations & Functions",
    duration: "25 min",
    xpReward: 130,
    objectives: [
      "Define mathematical relations",
      "Distinguish functions from relations",
      "Identify function properties (injective, surjective)",
    ],
    sections: [
      {
        type: "text",
        content: `A relation connects elements from one set to another. Functions are special relations where each input maps to exactly one output—the foundation of all programming functions.`,
      },
      {
        type: "concept",
        title: "Functions as Relations",
        content: `A function f: A → B maps each element in A to exactly one element in B. If f(x) = y and f(x) = z, then y must equal z.`,
      },
      {
        type: "math",
        title: "Function Types",
        content: `Key properties:`,
        formula: "\\text{Injective: } f(a) = f(b) \\Rightarrow a = b \\quad \\text{Surjective: } \\forall b \\in B, \\exists a \\in A : f(a) = b",
      },
    ],
    practices: [
      { id: 1, question: "Can a function map one input to multiple outputs?", options: ["Yes", "No", "Only for injective functions", "Depends on the domain"], correct: 1 },
      { id: 2, question: "An injective function is also called:", options: ["Onto", "One-to-one", "Surjective", "Bijective"], correct: 1 },
      { id: 3, question: "A bijective function is both:", options: ["Reflexive and transitive", "Injective and surjective", "Commutative and associative", "Linear and continuous"], correct: 1 },
    ],
  },
};

// Get all lessons in order for navigation
export const allLessons: LessonMetadata[] = [
  // Foundation - Number Systems
  { id: "foundation/number-systems/binary-intro", title: "Introduction to Binary", duration: "15 min", trackId: "foundation", moduleId: "number-systems", trackTitle: "Foundation" },
  { id: "foundation/number-systems/binary-arithmetic", title: "Binary Arithmetic", duration: "20 min", trackId: "foundation", moduleId: "number-systems", trackTitle: "Foundation" },
  { id: "foundation/number-systems/hexadecimal", title: "Hexadecimal & Octal", duration: "18 min", trackId: "foundation", moduleId: "number-systems", trackTitle: "Foundation" },
  { id: "foundation/number-systems/floating-point", title: "Floating Point", duration: "25 min", trackId: "foundation", moduleId: "number-systems", trackTitle: "Foundation" },
  // Foundation - Boolean Algebra
  { id: "foundation/boolean-algebra/logic-gates", title: "Logic Gates Fundamentals", duration: "20 min", trackId: "foundation", moduleId: "boolean-algebra", trackTitle: "Foundation" },
  { id: "foundation/boolean-algebra/truth-tables", title: "Truth Tables & Expressions", duration: "22 min", trackId: "foundation", moduleId: "boolean-algebra", trackTitle: "Foundation" },
  { id: "foundation/boolean-algebra/boolean-laws", title: "Boolean Laws & Simplification", duration: "25 min", trackId: "foundation", moduleId: "boolean-algebra", trackTitle: "Foundation" },
  { id: "foundation/boolean-algebra/circuit-design", title: "Digital Circuit Design", duration: "30 min", trackId: "foundation", moduleId: "boolean-algebra", trackTitle: "Foundation" },
  // Foundation - Set Theory
  { id: "foundation/set-theory/sets-intro", title: "Introduction to Sets", duration: "15 min", trackId: "foundation", moduleId: "set-theory", trackTitle: "Foundation" },
  { id: "foundation/set-theory/set-operations", title: "Set Operations", duration: "20 min", trackId: "foundation", moduleId: "set-theory", trackTitle: "Foundation" },
  { id: "foundation/set-theory/relations", title: "Relations & Functions", duration: "25 min", trackId: "foundation", moduleId: "set-theory", trackTitle: "Foundation" },
];

// Helper to get next uncompleted lesson
export function getNextLesson(completedLessons: string[]): LessonMetadata | null {
  return allLessons.find((lesson) => !completedLessons.includes(lesson.id)) || null;
}

// Helper to get lesson content by full ID
export function getLessonById(lessonId: string): LessonContent | null {
  return lessonsData[lessonId] || null;
}
