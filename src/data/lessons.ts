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
  // =========================================
  // FOUNDATION TRACK
  // =========================================
  
  // Foundation - Number Systems
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

  // Foundation - Boolean Algebra
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

  // Foundation - Set Theory
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

  // =========================================
  // CORE PROGRAMMING TRACK
  // =========================================

  // Core Programming - Linear Algebra
  "core/linear-algebra/vectors-intro": {
    title: "Introduction to Vectors",
    duration: "20 min",
    xpReward: 100,
    objectives: [
      "Understand vectors as ordered lists of numbers",
      "Perform vector addition and scalar multiplication",
      "Calculate vector magnitude and direction",
    ],
    sections: [
      {
        type: "text",
        content: `Vectors are the building blocks of modern computing, from graphics to machine learning. A vector is simply an ordered list of numbers that can represent points, directions, or features in multi-dimensional space.`,
      },
      {
        type: "math",
        title: "Vector Notation",
        content: `A vector in n-dimensional space:`,
        formula: "\\vec{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_n \\end{bmatrix} \\quad |\\vec{v}| = \\sqrt{v_1^2 + v_2^2 + ... + v_n^2}",
      },
      {
        type: "code",
        title: "Vectors in NumPy",
        language: "python",
        code: `import numpy as np

# Create vectors
v = np.array([3, 4])
w = np.array([1, 2])

# Vector operations
print(v + w)        # Addition: [4, 6]
print(2 * v)        # Scalar mult: [6, 8]
print(np.linalg.norm(v))  # Magnitude: 5.0`,
      },
      {
        type: "concept",
        title: "Applications",
        content: `Vectors are everywhere: image pixels as color vectors, word embeddings in NLP, feature vectors in ML, and position/velocity in game physics.`,
      },
    ],
    practices: [
      { id: 1, question: "What is the magnitude of vector [3, 4]?", options: ["7", "5", "12", "25"], correct: 1 },
      { id: 2, question: "[1,2] + [3,4] equals:", options: ["[4,6]", "[3,8]", "[2,6]", "[1,8]"], correct: 0 },
      { id: 3, question: "How many dimensions does [1,2,3,4] have?", options: ["1", "2", "3", "4"], correct: 3 },
    ],
  },

  "core/linear-algebra/matrices-intro": {
    title: "Introduction to Matrices",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Understand matrices as 2D arrays of numbers",
      "Perform matrix addition and scalar multiplication",
      "Apply matrix transposition",
    ],
    sections: [
      {
        type: "text",
        content: `Matrices are rectangular grids of numbers that form the backbone of computer graphics, neural networks, and data transformations. They organize data in rows and columns for efficient computation.`,
      },
      {
        type: "math",
        title: "Matrix Notation",
        content: `An m×n matrix has m rows and n columns:`,
        formula: "A = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix} \\quad A^T = \\begin{bmatrix} a_{11} & a_{21} \\\\ a_{12} & a_{22} \\end{bmatrix}",
      },
      {
        type: "code",
        title: "Matrices in NumPy",
        language: "python",
        code: `import numpy as np

# Create a matrix
A = np.array([[1, 2], [3, 4]])

# Operations
print(A + A)      # Element-wise addition
print(3 * A)      # Scalar multiplication
print(A.T)        # Transpose
print(A.shape)    # (2, 2)`,
      },
    ],
    practices: [
      { id: 1, question: "A 3x4 matrix has how many elements?", options: ["7", "12", "16", "34"], correct: 1 },
      { id: 2, question: "What does transposing a matrix do?", options: ["Inverts it", "Swaps rows and columns", "Doubles it", "Negates it"], correct: 1 },
      { id: 3, question: "What's the identity matrix?", options: ["All zeros", "All ones", "1s on diagonal, 0s elsewhere", "Random values"], correct: 2 },
    ],
  },

  "core/linear-algebra/matrix-multiplication": {
    title: "Matrix Multiplication",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Understand dot product of vectors",
      "Perform matrix-vector multiplication",
      "Master matrix-matrix multiplication",
    ],
    sections: [
      {
        type: "text",
        content: `Matrix multiplication is the core operation in deep learning, transforming data through neural network layers. Understanding it deeply is essential for any ML practitioner.`,
      },
      {
        type: "math",
        title: "Dot Product",
        content: `The dot product of two vectors:`,
        formula: "\\vec{a} \\cdot \\vec{b} = a_1b_1 + a_2b_2 + ... + a_nb_n = |\\vec{a}||\\vec{b}|\\cos\\theta",
      },
      {
        type: "concept",
        title: "Matrix Multiplication Rule",
        content: `For A(m×n) × B(n×p) = C(m×p), each element C[i,j] is the dot product of row i of A with column j of B. The inner dimensions must match!`,
      },
      {
        type: "code",
        title: "Matrix Multiplication in NumPy",
        language: "python",
        code: `import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Dot product
v = np.array([1, 2])
w = np.array([3, 4])
print(np.dot(v, w))  # 11

# Matrix multiplication
print(A @ B)  # Or np.matmul(A, B)`,
      },
    ],
    practices: [
      { id: 1, question: "[1,2] · [3,4] equals:", options: ["7", "10", "11", "14"], correct: 2 },
      { id: 2, question: "Can you multiply a 3x2 matrix by a 4x3 matrix?", options: ["Yes", "No", "Only sometimes", "Only with transpose"], correct: 1 },
      { id: 3, question: "Result dimensions of 2x3 × 3x4 is:", options: ["2x4", "3x3", "2x3", "3x4"], correct: 0 },
    ],
  },

  "core/linear-algebra/linear-transformations": {
    title: "Linear Transformations",
    duration: "25 min",
    xpReward: 130,
    objectives: [
      "Understand matrices as transformations",
      "Apply rotation, scaling, and shearing matrices",
      "Compose multiple transformations",
    ],
    sections: [
      {
        type: "text",
        content: `Matrices aren't just grids of numbers—they represent transformations of space. Every matrix can stretch, rotate, or shear vectors, which is the foundation of computer graphics.`,
      },
      {
        type: "math",
        title: "Common Transformations",
        content: `2D rotation by angle θ:`,
        formula: "R(\\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}",
      },
      {
        type: "code",
        title: "Transformations in Practice",
        language: "python",
        code: `import numpy as np

# Rotation matrix (90 degrees)
theta = np.pi / 2
R = np.array([
    [np.cos(theta), -np.sin(theta)],
    [np.sin(theta), np.cos(theta)]
])

# Scale matrix
S = np.array([[2, 0], [0, 2]])  # 2x scale

# Apply transformation
point = np.array([1, 0])
rotated = R @ point  # [0, 1]`,
      },
    ],
    practices: [
      { id: 1, question: "A 2x scaling matrix has what on its diagonal?", options: ["0", "1", "2", "0.5"], correct: 2 },
      { id: 2, question: "What does a rotation matrix preserve?", options: ["Size only", "Orientation only", "Both size and angles", "Neither"], correct: 2 },
      { id: 3, question: "Order matters in matrix composition because:", options: ["Matrices are symmetric", "Multiplication is commutative", "Multiplication is NOT commutative", "They cancel out"], correct: 2 },
    ],
  },

  // Core Programming - Calculus
  "core/calculus/derivatives-intro": {
    title: "Introduction to Derivatives",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Understand derivatives as rates of change",
      "Apply basic derivative rules",
      "Compute gradients of simple functions",
    ],
    sections: [
      {
        type: "text",
        content: `Derivatives measure how a function changes as its input changes. In machine learning, they're the engine of training—telling us how to adjust parameters to reduce error.`,
      },
      {
        type: "math",
        title: "Definition of Derivative",
        content: `The derivative of f at point x:`,
        formula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
      },
      {
        type: "concept",
        title: "Common Rules",
        content: `Power rule: d/dx(xⁿ) = nxⁿ⁻¹. Chain rule: d/dx[f(g(x))] = f'(g(x))·g'(x). These rules let us differentiate complex functions.`,
      },
      {
        type: "code",
        title: "Derivatives with SymPy",
        language: "python",
        code: `from sympy import symbols, diff, sin, cos

x = symbols('x')

# Differentiate x^2
print(diff(x**2, x))  # 2*x

# Differentiate sin(x)
print(diff(sin(x), x))  # cos(x)

# Chain rule: sin(x^2)
print(diff(sin(x**2), x))  # 2*x*cos(x^2)`,
      },
    ],
    practices: [
      { id: 1, question: "What is the derivative of x³?", options: ["x²", "3x²", "3x³", "x⁴/4"], correct: 1 },
      { id: 2, question: "The derivative of a constant is:", options: ["1", "0", "The constant", "Undefined"], correct: 1 },
      { id: 3, question: "Derivative of sin(x) is:", options: ["-cos(x)", "cos(x)", "-sin(x)", "tan(x)"], correct: 1 },
    ],
  },

  "core/calculus/gradients": {
    title: "Gradients & Partial Derivatives",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Compute partial derivatives",
      "Understand the gradient vector",
      "Apply gradients in optimization",
    ],
    sections: [
      {
        type: "text",
        content: `When a function has multiple inputs, we need partial derivatives—derivatives with respect to one variable while holding others constant. The gradient combines all partial derivatives into a vector.`,
      },
      {
        type: "math",
        title: "The Gradient Vector",
        content: `For f(x,y), the gradient points in the direction of steepest increase:`,
        formula: "\\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x} \\\\ \\frac{\\partial f}{\\partial y} \\end{bmatrix}",
      },
      {
        type: "code",
        title: "Computing Gradients",
        language: "python",
        code: `from sympy import symbols, diff

x, y = symbols('x y')

# f(x,y) = x^2 + xy + y^2
f = x**2 + x*y + y**2

# Partial derivatives
df_dx = diff(f, x)  # 2*x + y
df_dy = diff(f, y)  # x + 2*y

print(f"∇f = [{df_dx}, {df_dy}]")`,
      },
      {
        type: "concept",
        title: "Why Gradients Matter",
        content: `In machine learning, the gradient of the loss function tells us which direction to move our parameters to reduce error. This is the core of gradient descent!`,
      },
    ],
    practices: [
      { id: 1, question: "For f(x,y) = xy, what is ∂f/∂x?", options: ["x", "y", "xy", "1"], correct: 1 },
      { id: 2, question: "The gradient points in the direction of:", options: ["Minimum", "Maximum", "Steepest increase", "Steepest decrease"], correct: 2 },
      { id: 3, question: "How many components in the gradient of f(x,y,z)?", options: ["1", "2", "3", "6"], correct: 2 },
    ],
  },

  "core/calculus/chain-rule": {
    title: "Chain Rule & Backpropagation",
    duration: "35 min",
    xpReward: 160,
    objectives: [
      "Master the chain rule for composed functions",
      "Understand computational graphs",
      "Connect chain rule to backpropagation",
    ],
    sections: [
      {
        type: "text",
        content: `The chain rule is how derivatives flow through composed functions. In neural networks, backpropagation is just the chain rule applied systematically through layers.`,
      },
      {
        type: "math",
        title: "Chain Rule",
        content: `For y = f(g(x)), the derivative is:`,
        formula: "\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx} \\quad \\text{where } u = g(x)",
      },
      {
        type: "concept",
        title: "Computational Graphs",
        content: `Neural networks are computational graphs where each node is an operation. Forward pass computes outputs; backward pass (backprop) computes gradients using the chain rule at each node.`,
      },
      {
        type: "code",
        title: "Backprop Example",
        language: "python",
        code: `# Simple computational graph: y = (x * w)^2
# Forward pass
x, w = 3.0, 2.0
u = x * w       # u = 6
y = u ** 2      # y = 36

# Backward pass (chain rule)
dy_du = 2 * u   # = 12
du_dw = x       # = 3
dy_dw = dy_du * du_dw  # = 36

print(f"∂y/∂w = {dy_dw}")`,
      },
    ],
    practices: [
      { id: 1, question: "For f(g(x)) where f(u)=u² and g(x)=3x, f'(g(x)) is:", options: ["6x", "2(3x)", "6", "9x²"], correct: 1 },
      { id: 2, question: "Backpropagation computes:", options: ["Predictions", "Gradients", "Activations", "Weights"], correct: 1 },
      { id: 3, question: "In the chain rule, derivatives are:", options: ["Added", "Subtracted", "Multiplied", "Divided"], correct: 2 },
    ],
  },

  "core/calculus/optimization": {
    title: "Optimization & Gradient Descent",
    duration: "30 min",
    xpReward: 150,
    objectives: [
      "Understand local vs global minima",
      "Implement gradient descent",
      "Tune learning rate and momentum",
    ],
    sections: [
      {
        type: "text",
        content: `Optimization finds the best parameters for our model by minimizing a loss function. Gradient descent iteratively moves parameters in the direction opposite to the gradient.`,
      },
      {
        type: "math",
        title: "Gradient Descent Update",
        content: `Update parameters θ using learning rate α:`,
        formula: "\\theta_{new} = \\theta_{old} - \\alpha \\nabla L(\\theta)",
      },
      {
        type: "code",
        title: "Simple Gradient Descent",
        language: "python",
        code: `import numpy as np

# Minimize f(x) = x^2
def f(x): return x**2
def grad(x): return 2*x

x = 10.0  # Starting point
lr = 0.1  # Learning rate

for i in range(20):
    x = x - lr * grad(x)
    print(f"Step {i}: x = {x:.4f}, f(x) = {f(x):.4f}")`,
      },
      {
        type: "concept",
        title: "Learning Rate",
        content: `Too high: overshoots minimum, diverges. Too low: slow convergence. Common techniques: learning rate schedules, Adam optimizer which adapts learning rate per parameter.`,
      },
    ],
    practices: [
      { id: 1, question: "Gradient descent moves in what direction?", options: ["Same as gradient", "Opposite to gradient", "Perpendicular", "Random"], correct: 1 },
      { id: 2, question: "What happens if learning rate is too high?", options: ["Faster convergence", "Oscillation/divergence", "No change", "Better accuracy"], correct: 1 },
      { id: 3, question: "A local minimum is:", options: ["Always global minimum", "Lowest point nearby", "Highest point", "Saddle point"], correct: 1 },
    ],
  },

  // Core Programming - Probability
  "core/probability/probability-basics": {
    title: "Probability Fundamentals",
    duration: "20 min",
    xpReward: 100,
    objectives: [
      "Understand probability axioms",
      "Calculate conditional probabilities",
      "Apply Bayes' theorem",
    ],
    sections: [
      {
        type: "text",
        content: `Probability quantifies uncertainty. In ML, everything is probabilistic—from predicting outcomes to understanding model confidence. It's the mathematical language of uncertainty.`,
      },
      {
        type: "math",
        title: "Probability Axioms",
        content: `Basic rules:`,
        formula: "0 \\leq P(A) \\leq 1 \\quad P(\\Omega) = 1 \\quad P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
      },
      {
        type: "concept",
        title: "Conditional Probability",
        content: `P(A|B) is the probability of A given B has occurred. P(A|B) = P(A∩B)/P(B). This is fundamental for classification and inference.`,
      },
      {
        type: "math",
        title: "Bayes' Theorem",
        content: `Inverting conditional probabilities:`,
        formula: "P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}",
      },
    ],
    practices: [
      { id: 1, question: "What's the probability of an impossible event?", options: ["0", "0.5", "1", "Undefined"], correct: 0 },
      { id: 2, question: "P(A∪B) when A and B are mutually exclusive:", options: ["P(A)P(B)", "P(A)+P(B)", "P(A)-P(B)", "0"], correct: 1 },
      { id: 3, question: "Bayes' theorem relates:", options: ["Two events", "Conditional probabilities", "Only prior probabilities", "Only posteriors"], correct: 1 },
    ],
  },

  "core/probability/distributions": {
    title: "Probability Distributions",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Understand discrete vs continuous distributions",
      "Work with normal and uniform distributions",
      "Calculate expected value and variance",
    ],
    sections: [
      {
        type: "text",
        content: `Distributions describe how probabilities are spread across outcomes. The normal distribution models natural phenomena; uniform gives equal probability to all outcomes.`,
      },
      {
        type: "math",
        title: "Normal Distribution",
        content: `The bell curve defined by mean μ and standard deviation σ:`,
        formula: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}",
      },
      {
        type: "code",
        title: "Working with Distributions",
        language: "python",
        code: `import numpy as np
from scipy import stats

# Normal distribution
normal = stats.norm(loc=0, scale=1)  # μ=0, σ=1
print(normal.pdf(0))    # Probability density at x=0
print(normal.cdf(1.96)) # P(X < 1.96) ≈ 0.975

# Sample from distribution
samples = normal.rvs(size=1000)
print(f"Mean: {np.mean(samples):.2f}")`,
      },
    ],
    practices: [
      { id: 1, question: "The normal distribution is defined by:", options: ["Just mean", "Just variance", "Mean and variance", "Mode only"], correct: 2 },
      { id: 2, question: "In a uniform distribution, all outcomes are:", options: ["Certain", "Impossible", "Equally likely", "Normally distributed"], correct: 2 },
      { id: 3, question: "68% of normal data falls within:", options: ["1σ", "2σ", "3σ", "0.5σ"], correct: 0 },
    ],
  },

  "core/probability/statistical-inference": {
    title: "Statistical Inference",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Understand sampling and estimation",
      "Construct confidence intervals",
      "Perform hypothesis testing",
    ],
    sections: [
      {
        type: "text",
        content: `Statistical inference draws conclusions about populations from samples. This is how we validate ML models—are the observed improvements real or just random chance?`,
      },
      {
        type: "concept",
        title: "Confidence Intervals",
        content: `A 95% CI means: if we repeated the experiment many times, 95% of computed intervals would contain the true parameter. It quantifies estimation uncertainty.`,
      },
      {
        type: "math",
        title: "Standard Error",
        content: `Standard error of the mean:`,
        formula: "SE = \\frac{\\sigma}{\\sqrt{n}}",
      },
      {
        type: "code",
        title: "Hypothesis Testing",
        language: "python",
        code: `from scipy import stats
import numpy as np

# A/B test: compare two groups
control = [4.2, 3.8, 4.1, 3.9, 4.0]
treatment = [4.5, 4.7, 4.3, 4.8, 4.6]

# T-test
t_stat, p_value = stats.ttest_ind(treatment, control)
print(f"p-value: {p_value:.4f}")

if p_value < 0.05:
    print("Statistically significant difference!")`,
      },
    ],
    practices: [
      { id: 1, question: "A smaller p-value suggests:", options: ["Weak evidence", "Strong evidence against null", "Certain truth", "No conclusion"], correct: 1 },
      { id: 2, question: "Increasing sample size does what to standard error?", options: ["Increases it", "Decreases it", "No effect", "Doubles it"], correct: 1 },
      { id: 3, question: "Type I error is:", options: ["False negative", "False positive", "Correct rejection", "Correct acceptance"], correct: 1 },
    ],
  },

  "core/probability/information-theory": {
    title: "Information Theory",
    duration: "25 min",
    xpReward: 130,
    objectives: [
      "Understand entropy as uncertainty measure",
      "Calculate cross-entropy",
      "Apply KL divergence in ML",
    ],
    sections: [
      {
        type: "text",
        content: `Information theory, developed by Claude Shannon, quantifies information. In ML, it underlies loss functions (cross-entropy), decision trees, and information-theoretic approaches to learning.`,
      },
      {
        type: "math",
        title: "Entropy",
        content: `Entropy measures average uncertainty in a distribution:`,
        formula: "H(X) = -\\sum_x P(x) \\log_2 P(x)",
      },
      {
        type: "concept",
        title: "Cross-Entropy Loss",
        content: `Cross-entropy between true distribution p and predicted distribution q measures how well q predicts p. Lower cross-entropy = better predictions. It's the standard classification loss function.`,
      },
      {
        type: "code",
        title: "Computing Entropy",
        language: "python",
        code: `import numpy as np

def entropy(probs):
    return -np.sum(probs * np.log2(probs + 1e-10))

# Fair coin: high entropy (uncertain)
fair = entropy([0.5, 0.5])  # 1.0 bit

# Biased coin: lower entropy
biased = entropy([0.9, 0.1])  # 0.47 bits

print(f"Fair: {fair:.2f}, Biased: {biased:.2f}")`,
      },
    ],
    practices: [
      { id: 1, question: "Maximum entropy for a fair coin flip is:", options: ["0 bits", "0.5 bits", "1 bit", "2 bits"], correct: 2 },
      { id: 2, question: "Cross-entropy loss is used for:", options: ["Regression", "Classification", "Clustering", "Dimensionality reduction"], correct: 1 },
      { id: 3, question: "KL divergence measures:", options: ["Similarity of means", "Difference between distributions", "Variance", "Correlation"], correct: 1 },
    ],
  },

  // =========================================
  // ML & AI TRACK
  // =========================================

  "ml-ai/fundamentals/ml-intro": {
    title: "Introduction to Machine Learning",
    duration: "20 min",
    xpReward: 100,
    objectives: [
      "Distinguish supervised, unsupervised, and reinforcement learning",
      "Understand the ML workflow",
      "Recognize common ML problems",
    ],
    sections: [
      {
        type: "text",
        content: `Machine learning enables computers to learn patterns from data without being explicitly programmed. It's the foundation of modern AI, powering everything from recommendations to autonomous vehicles.`,
      },
      {
        type: "concept",
        title: "Types of Machine Learning",
        content: `Supervised: learn from labeled examples (classification, regression). Unsupervised: find patterns without labels (clustering, dimensionality reduction). Reinforcement: learn from rewards/penalties.`,
      },
      {
        type: "code",
        title: "Simple ML Pipeline",
        language: "python",
        code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# 1. Split data
X_train, X_test, y_train, y_test = train_test_split(X, y)

# 2. Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# 3. Evaluate
accuracy = model.score(X_test, y_test)`,
      },
    ],
    practices: [
      { id: 1, question: "Classification is what type of learning?", options: ["Unsupervised", "Supervised", "Reinforcement", "Semi-supervised"], correct: 1 },
      { id: 2, question: "Clustering is:", options: ["Supervised", "Unsupervised", "Reinforcement", "None"], correct: 1 },
      { id: 3, question: "What do we call the data used to evaluate?", options: ["Training set", "Validation set", "Test set", "Feature set"], correct: 2 },
    ],
  },

  "ml-ai/fundamentals/linear-regression": {
    title: "Linear Regression",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Understand linear regression mathematically",
      "Implement least squares fitting",
      "Evaluate regression models",
    ],
    sections: [
      {
        type: "text",
        content: `Linear regression finds the best-fitting line through data points. It's the simplest regression model and introduces key concepts like loss functions and optimization that apply to all of ML.`,
      },
      {
        type: "math",
        title: "Linear Regression Model",
        content: `Predict y from x:`,
        formula: "\\hat{y} = wx + b \\quad L = \\frac{1}{n}\\sum_{i=1}^n (y_i - \\hat{y}_i)^2",
      },
      {
        type: "code",
        title: "Linear Regression in Python",
        language: "python",
        code: `from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Fit model
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluate
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"MSE: {mse:.4f}, R²: {r2:.4f}")`,
      },
    ],
    practices: [
      { id: 1, question: "MSE stands for:", options: ["Maximum Standard Error", "Mean Squared Error", "Median Standard Estimate", "Model Selection Error"], correct: 1 },
      { id: 2, question: "R² of 1.0 means:", options: ["Perfect fit", "No fit", "50% fit", "Overfitting"], correct: 0 },
      { id: 3, question: "In y = wx + b, w is called:", options: ["Intercept", "Bias", "Slope/Weight", "Residual"], correct: 2 },
    ],
  },

  "ml-ai/fundamentals/logistic-regression": {
    title: "Logistic Regression",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Understand the sigmoid function",
      "Apply logistic regression for classification",
      "Interpret probability outputs",
    ],
    sections: [
      {
        type: "text",
        content: `Despite its name, logistic regression is a classification algorithm. It predicts the probability of a binary outcome using the sigmoid function to squash outputs between 0 and 1.`,
      },
      {
        type: "math",
        title: "Sigmoid Function",
        content: `The sigmoid squashes any input to (0, 1):`,
        formula: "\\sigma(z) = \\frac{1}{1 + e^{-z}} \\quad P(y=1|x) = \\sigma(wx + b)",
      },
      {
        type: "code",
        title: "Binary Classification",
        language: "python",
        code: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix

model = LogisticRegression()
model.fit(X_train, y_train)

# Predict classes
y_pred = model.predict(X_test)

# Predict probabilities
y_proba = model.predict_proba(X_test)

print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
print(confusion_matrix(y_test, y_pred))`,
      },
    ],
    practices: [
      { id: 1, question: "Sigmoid output at z=0 is:", options: ["0", "0.5", "1", "-0.5"], correct: 1 },
      { id: 2, question: "Logistic regression is used for:", options: ["Regression only", "Classification only", "Both", "Neither"], correct: 1 },
      { id: 3, question: "Cross-entropy loss is preferred because:", options: ["It's simpler", "Works with probabilities", "Faster to compute", "Always equals zero"], correct: 1 },
    ],
  },

  "ml-ai/fundamentals/overfitting": {
    title: "Overfitting & Regularization",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Identify overfitting and underfitting",
      "Apply L1 and L2 regularization",
      "Use cross-validation for model selection",
    ],
    sections: [
      {
        type: "text",
        content: `Overfitting occurs when a model memorizes training data but fails to generalize. Regularization and proper validation are essential techniques to build robust models.`,
      },
      {
        type: "concept",
        title: "Bias-Variance Tradeoff",
        content: `High bias = underfitting (too simple). High variance = overfitting (too complex). The goal is finding the sweet spot with good generalization.`,
      },
      {
        type: "math",
        title: "Regularization",
        content: `Add penalty to loss to constrain weights:`,
        formula: "L_{reg} = L + \\lambda \\sum w_i^2 \\quad \\text{(L2/Ridge)}",
      },
      {
        type: "code",
        title: "Cross-Validation",
        language: "python",
        code: `from sklearn.model_selection import cross_val_score
from sklearn.linear_model import Ridge

# Ridge regression (L2)
model = Ridge(alpha=1.0)

# 5-fold cross-validation
scores = cross_val_score(model, X, y, cv=5)
print(f"Mean CV score: {scores.mean():.4f} ± {scores.std():.4f}")`,
      },
    ],
    practices: [
      { id: 1, question: "Overfitting means:", options: ["High training error", "High test error", "Model too simple", "Good generalization"], correct: 1 },
      { id: 2, question: "L2 regularization adds:", options: ["Sum of weights", "Sum of absolute weights", "Sum of squared weights", "No penalty"], correct: 2 },
      { id: 3, question: "Cross-validation helps:", options: ["Speed up training", "Estimate generalization", "Reduce data needs", "Increase complexity"], correct: 1 },
    ],
  },

  // ML & AI - Neural Networks
  "ml-ai/neural-networks/perceptron": {
    title: "The Perceptron",
    duration: "20 min",
    xpReward: 110,
    objectives: [
      "Understand the perceptron as a single neuron",
      "Implement the perceptron learning algorithm",
      "Recognize limitations of single-layer networks",
    ],
    sections: [
      {
        type: "text",
        content: `The perceptron, invented in 1958, is the simplest neural network—a single neuron. It learns to classify linearly separable data and introduced the concept of learning from errors.`,
      },
      {
        type: "math",
        title: "Perceptron Model",
        content: `Output is 1 if weighted sum exceeds threshold:`,
        formula: "y = \\begin{cases} 1 & \\text{if } \\vec{w} \\cdot \\vec{x} + b > 0 \\\\ 0 & \\text{otherwise} \\end{cases}",
      },
      {
        type: "code",
        title: "Perceptron Implementation",
        language: "python",
        code: `import numpy as np

class Perceptron:
    def __init__(self, lr=0.1):
        self.lr = lr
    
    def fit(self, X, y, epochs=100):
        self.w = np.zeros(X.shape[1])
        self.b = 0
        for _ in range(epochs):
            for xi, yi in zip(X, y):
                pred = 1 if np.dot(xi, self.w) + self.b > 0 else 0
                self.w += self.lr * (yi - pred) * xi
                self.b += self.lr * (yi - pred)`,
      },
    ],
    practices: [
      { id: 1, question: "A perceptron can solve:", options: ["XOR problem", "Any problem", "Linearly separable problems", "Non-linear problems"], correct: 2 },
      { id: 2, question: "The perceptron uses what activation?", options: ["Sigmoid", "ReLU", "Step function", "Softmax"], correct: 2 },
      { id: 3, question: "Who invented the perceptron?", options: ["Hinton", "Rosenblatt", "LeCun", "Bengio"], correct: 1 },
    ],
  },

  "ml-ai/neural-networks/multi-layer": {
    title: "Multi-Layer Networks",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Understand hidden layers and depth",
      "Apply activation functions (ReLU, sigmoid, tanh)",
      "Recognize why depth matters",
    ],
    sections: [
      {
        type: "text",
        content: `Adding hidden layers between input and output allows networks to learn non-linear patterns. Deep networks can represent hierarchical features, from edges to objects to concepts.`,
      },
      {
        type: "concept",
        title: "Activation Functions",
        content: `ReLU: max(0, x) - fast, avoids vanishing gradients. Sigmoid: (0,1) - good for probabilities. Tanh: (-1,1) - centered at zero. Each has trade-offs in training dynamics.`,
      },
      {
        type: "math",
        title: "ReLU Activation",
        content: `The most popular activation today:`,
        formula: "\\text{ReLU}(x) = \\max(0, x) \\quad \\frac{d}{dx}\\text{ReLU}(x) = \\begin{cases} 1 & x > 0 \\\\ 0 & x \\leq 0 \\end{cases}",
      },
      {
        type: "code",
        title: "Building an MLP",
        language: "python",
        code: `import torch.nn as nn

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(784, 256),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, 10)
        )
    
    def forward(self, x):
        return self.layers(x)`,
      },
    ],
    practices: [
      { id: 1, question: "ReLU(−5) equals:", options: ["-5", "0", "5", "1"], correct: 1 },
      { id: 2, question: "Hidden layers make networks:", options: ["Linear", "Non-linear", "Faster", "Simpler"], correct: 1 },
      { id: 3, question: "Vanishing gradients affect:", options: ["Shallow networks", "Deep networks", "Only CNNs", "Only RNNs"], correct: 1 },
    ],
  },

  "ml-ai/neural-networks/training": {
    title: "Training Neural Networks",
    duration: "35 min",
    xpReward: 160,
    objectives: [
      "Implement forward and backward passes",
      "Use optimizers (SGD, Adam)",
      "Apply dropout and batch normalization",
    ],
    sections: [
      {
        type: "text",
        content: `Training neural networks involves iterating through data, computing loss, calculating gradients via backpropagation, and updating weights. Modern frameworks automate this, but understanding the process is essential.`,
      },
      {
        type: "concept",
        title: "The Training Loop",
        content: `1. Forward pass: compute predictions. 2. Compute loss. 3. Backward pass: compute gradients. 4. Update weights. 5. Repeat for all batches and epochs.`,
      },
      {
        type: "code",
        title: "PyTorch Training Loop",
        language: "python",
        code: `import torch
import torch.nn as nn
import torch.optim as optim

model = MLP()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    for batch_x, batch_y in dataloader:
        optimizer.zero_grad()          # Clear gradients
        outputs = model(batch_x)       # Forward
        loss = criterion(outputs, batch_y)
        loss.backward()                # Backward
        optimizer.step()               # Update weights`,
      },
      {
        type: "concept",
        title: "Regularization Techniques",
        content: `Dropout randomly zeroes activations during training, preventing co-adaptation. Batch normalization normalizes layer inputs, stabilizing and accelerating training.`,
      },
    ],
    practices: [
      { id: 1, question: "Adam optimizer combines:", options: ["SGD and RMSprop", "Momentum and learning rate", "Dropout and normalization", "L1 and L2"], correct: 0 },
      { id: 2, question: "Dropout is applied during:", options: ["Training only", "Testing only", "Both", "Neither"], correct: 0 },
      { id: 3, question: "Why zero gradients each step?", options: ["Speed up", "Prevent accumulation", "Increase loss", "Reset weights"], correct: 1 },
    ],
  },

  "ml-ai/neural-networks/cnn-intro": {
    title: "Convolutional Neural Networks",
    duration: "35 min",
    xpReward: 160,
    objectives: [
      "Understand convolution operations",
      "Build CNN architectures for images",
      "Apply pooling and feature extraction",
    ],
    sections: [
      {
        type: "text",
        content: `CNNs revolutionized computer vision by learning spatial hierarchies of features. Convolutional layers detect local patterns (edges, textures) that combine into higher-level features (objects, scenes).`,
      },
      {
        type: "concept",
        title: "Convolution Operation",
        content: `A filter slides over the image, computing dot products. This detects features regardless of position (translation invariance). Multiple filters learn different features.`,
      },
      {
        type: "code",
        title: "Simple CNN for MNIST",
        language: "python",
        code: `import torch.nn as nn

class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(1, 32, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )
        self.fc = nn.Linear(64 * 7 * 7, 10)`,
      },
    ],
    practices: [
      { id: 1, question: "Pooling layers:", options: ["Add parameters", "Reduce spatial size", "Increase resolution", "Add noise"], correct: 1 },
      { id: 2, question: "A 3x3 convolution filter has how many parameters (no bias)?", options: ["3", "6", "9", "27"], correct: 2 },
      { id: 3, question: "CNNs achieve:", options: ["Rotation invariance", "Translation invariance", "Scale invariance", "All of these"], correct: 1 },
    ],
  },

  // ML & AI - Advanced Topics
  "ml-ai/advanced/attention": {
    title: "Attention Mechanisms",
    duration: "30 min",
    xpReward: 150,
    objectives: [
      "Understand attention as weighted averaging",
      "Implement self-attention",
      "Recognize the Transformer architecture",
    ],
    sections: [
      {
        type: "text",
        content: `Attention allows models to focus on relevant parts of the input. It's the foundation of Transformers, which power modern LLMs like GPT and BERT.`,
      },
      {
        type: "math",
        title: "Scaled Dot-Product Attention",
        content: `Query, Key, Value mechanism:`,
        formula: "\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V",
      },
      {
        type: "concept",
        title: "Self-Attention",
        content: `In self-attention, Q, K, V all come from the same sequence. Each position attends to all others, learning contextual relationships without sequential processing.`,
      },
      {
        type: "code",
        title: "Simple Self-Attention",
        language: "python",
        code: `import torch
import torch.nn.functional as F

def self_attention(x, d_k):
    # x: (batch, seq_len, d_model)
    Q = K = V = x  # Simplified
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, V)`,
      },
    ],
    practices: [
      { id: 1, question: "Attention computes:", options: ["Absolute positions", "Weighted averages", "Fixed patterns", "Random samples"], correct: 1 },
      { id: 2, question: "Transformers replaced:", options: ["CNNs", "RNNs for sequence tasks", "All neural networks", "Attention"], correct: 1 },
      { id: 3, question: "The scaling factor √d_k prevents:", options: ["Overfitting", "Vanishing gradients", "Softmax saturation", "Memory issues"], correct: 2 },
    ],
  },

  "ml-ai/advanced/embeddings": {
    title: "Word Embeddings",
    duration: "25 min",
    xpReward: 130,
    objectives: [
      "Understand word vectors and semantic meaning",
      "Use pre-trained embeddings",
      "Apply embeddings in NLP tasks",
    ],
    sections: [
      {
        type: "text",
        content: `Word embeddings represent words as dense vectors where similar words have similar vectors. This captures semantic meaning: "king - man + woman ≈ queen".`,
      },
      {
        type: "concept",
        title: "Vector Semantics",
        content: `Embeddings are learned from context: words appearing in similar contexts get similar vectors. Methods include Word2Vec, GloVe, and contextual embeddings like BERT.`,
      },
      {
        type: "code",
        title: "Using Pre-trained Embeddings",
        language: "python",
        code: `from gensim.models import KeyedVectors

# Load pre-trained Word2Vec
model = KeyedVectors.load_word2vec_format('GoogleNews-vectors.bin', binary=True)

# Find similar words
print(model.most_similar('python'))

# Analogies
result = model.most_similar(positive=['king', 'woman'], negative=['man'])
print(result[0])  # ('queen', 0.71)`,
      },
    ],
    practices: [
      { id: 1, question: "Word embeddings are:", options: ["One-hot vectors", "Dense vectors", "Sparse matrices", "Binary strings"], correct: 1 },
      { id: 2, question: "king - man + woman ≈:", options: ["prince", "queen", "king", "woman"], correct: 1 },
      { id: 3, question: "Contextual embeddings differ because:", options: ["Fixed vocabulary", "Same word can have different vectors", "Only work for English", "Require less data"], correct: 1 },
    ],
  },

  "ml-ai/advanced/transfer-learning": {
    title: "Transfer Learning",
    duration: "25 min",
    xpReward: 130,
    objectives: [
      "Understand pre-training and fine-tuning",
      "Apply transfer learning for vision and NLP",
      "Know when transfer learning helps",
    ],
    sections: [
      {
        type: "text",
        content: `Transfer learning uses knowledge from one task to improve another. Pre-trained models on massive datasets can be fine-tuned on your specific task with much less data.`,
      },
      {
        type: "concept",
        title: "Fine-Tuning Strategy",
        content: `Freeze early layers (general features), train later layers (task-specific). Alternatively, fine-tune all layers with a small learning rate. The right approach depends on data similarity and size.`,
      },
      {
        type: "code",
        title: "Fine-Tuning a Pre-trained Model",
        language: "python",
        code: `from transformers import BertForSequenceClassification, Trainer

# Load pre-trained BERT
model = BertForSequenceClassification.from_pretrained(
    'bert-base-uncased',
    num_labels=2  # Your task's classes
)

# Fine-tune on your data
trainer = Trainer(
    model=model,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset
)
trainer.train()`,
      },
    ],
    practices: [
      { id: 1, question: "Transfer learning requires:", options: ["No pre-training", "More data than from scratch", "Less task-specific data", "New architecture"], correct: 2 },
      { id: 2, question: "Early CNN layers typically learn:", options: ["Task-specific features", "General features like edges", "Only color", "Nothing useful"], correct: 1 },
      { id: 3, question: "Fine-tuning means:", options: ["Training from scratch", "Adjusting pre-trained weights", "Freezing all layers", "Changing architecture"], correct: 1 },
    ],
  },

  "ml-ai/advanced/generative-models": {
    title: "Generative Models",
    duration: "30 min",
    xpReward: 150,
    objectives: [
      "Understand generative vs discriminative models",
      "Learn basics of GANs and VAEs",
      "Recognize diffusion models",
    ],
    sections: [
      {
        type: "text",
        content: `Generative models learn to create new data similar to training data. They power image generation (DALL-E, Midjourney), text generation (GPT), and more.`,
      },
      {
        type: "concept",
        title: "GANs: Generator vs Discriminator",
        content: `Generator creates fake samples; Discriminator tries to distinguish real from fake. They compete, and the Generator improves until its outputs are indistinguishable from real data.`,
      },
      {
        type: "concept",
        title: "Diffusion Models",
        content: `Add noise to data (forward process), then learn to reverse it (denoising). Start from pure noise and iteratively denoise to generate realistic samples. Powers Stable Diffusion and DALL-E 2.`,
      },
      {
        type: "code",
        title: "Simple GAN Concept",
        language: "python",
        code: `# GAN Training Loop (conceptual)
for epoch in range(epochs):
    # Train Discriminator
    real_loss = criterion(D(real_images), ones)
    fake_loss = criterion(D(G(noise)), zeros)
    d_loss = real_loss + fake_loss
    
    # Train Generator
    g_loss = criterion(D(G(noise)), ones)  # Fool D`,
      },
    ],
    practices: [
      { id: 1, question: "In a GAN, the Generator:", options: ["Classifies images", "Creates fake images", "Detects fakes", "Compresses data"], correct: 1 },
      { id: 2, question: "Diffusion models work by:", options: ["Compression", "Adding then removing noise", "Direct sampling", "Autoencoding"], correct: 1 },
      { id: 3, question: "VAE stands for:", options: ["Vector Auto-Encoder", "Variational Auto-Encoder", "Visual Auto-Encoder", "Variable Auto-Encoder"], correct: 1 },
    ],
  },

  // =========================================
  // ALGORITHMS & DATA STRUCTURES TRACK
  // =========================================

  "algorithms/complexity/big-o": {
    title: "Big O Notation",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Understand time and space complexity",
      "Analyze algorithm efficiency",
      "Compare common complexity classes",
    ],
    sections: [
      {
        type: "text",
        content: `Big O notation describes how an algorithm's performance scales with input size. It's essential for choosing the right algorithm and data structure for your problem.`,
      },
      {
        type: "math",
        title: "Common Complexities",
        content: `From fastest to slowest:`,
        formula: "O(1) < O(\\log n) < O(n) < O(n \\log n) < O(n^2) < O(2^n) < O(n!)",
      },
      {
        type: "code",
        title: "Analyzing Complexity",
        language: "python",
        code: `# O(1) - Constant
def get_first(arr):
    return arr[0]

# O(n) - Linear
def find_max(arr):
    max_val = arr[0]
    for x in arr:  # Loops n times
        if x > max_val:
            max_val = x
    return max_val

# O(n²) - Quadratic
def bubble_sort(arr):
    for i in range(len(arr)):  # n times
        for j in range(len(arr)):  # n times each
            pass`,
      },
    ],
    practices: [
      { id: 1, question: "What's the complexity of accessing an array element?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], correct: 2 },
      { id: 2, question: "Binary search has complexity:", options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], correct: 1 },
      { id: 3, question: "O(n²) means time:", options: ["Doubles with input", "Quadruples when input doubles", "Stays constant", "Halves"], correct: 1 },
    ],
  },

  "algorithms/complexity/space-time": {
    title: "Space-Time Tradeoffs",
    duration: "20 min",
    xpReward: 110,
    objectives: [
      "Balance memory usage vs speed",
      "Apply memoization",
      "Choose appropriate data structures",
    ],
    sections: [
      {
        type: "text",
        content: `Often we can trade memory for speed or vice versa. Caching results (memoization) uses more memory but avoids recomputation. Understanding this tradeoff is key to optimization.`,
      },
      {
        type: "concept",
        title: "Memoization",
        content: `Store computed results to avoid recalculating. Classic example: Fibonacci without memoization is O(2ⁿ); with memoization it's O(n) using O(n) extra space.`,
      },
      {
        type: "code",
        title: "Fibonacci with Memoization",
        language: "python",
        code: `from functools import lru_cache

# Without memoization: O(2^n)
def fib_slow(n):
    if n <= 1: return n
    return fib_slow(n-1) + fib_slow(n-2)

# With memoization: O(n)
@lru_cache(maxsize=None)
def fib_fast(n):
    if n <= 1: return n
    return fib_fast(n-1) + fib_fast(n-2)`,
      },
    ],
    practices: [
      { id: 1, question: "Memoization trades:", options: ["Time for space", "Space for time", "Accuracy for speed", "Nothing"], correct: 1 },
      { id: 2, question: "A hash table uses extra space to achieve:", options: ["O(n) lookup", "O(log n) lookup", "O(1) average lookup", "O(n²) lookup"], correct: 2 },
      { id: 3, question: "Dynamic programming often uses:", options: ["Recursion only", "Memoization/tabulation", "Brute force", "Random sampling"], correct: 1 },
    ],
  },

  "algorithms/searching/binary-search": {
    title: "Binary Search",
    duration: "20 min",
    xpReward: 100,
    objectives: [
      "Implement binary search correctly",
      "Handle edge cases and variants",
      "Apply binary search to problem solving",
    ],
    sections: [
      {
        type: "text",
        content: `Binary search finds elements in sorted arrays in O(log n) time by repeatedly halving the search space. It's a fundamental algorithm with many applications beyond simple searching.`,
      },
      {
        type: "code",
        title: "Binary Search Implementation",
        language: "python",
        code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Not found`,
      },
      {
        type: "concept",
        title: "Applications",
        content: `Binary search applies to: finding insertion points, searching rotated arrays, finding peaks, square root calculation, and any monotonic function.`,
      },
    ],
    practices: [
      { id: 1, question: "Binary search requires:", options: ["Any array", "Sorted array", "Linked list", "Hash table"], correct: 1 },
      { id: 2, question: "How many comparisons for 1 million elements?", options: ["1 million", "1000", "~20", "1"], correct: 2 },
      { id: 3, question: "mid = (left + right) // 2 can overflow. Better:", options: ["left - (right-left)//2", "left + (right-left)//2", "(left * right) / 2", "right // 2"], correct: 1 },
    ],
  },

  "algorithms/searching/graph-search": {
    title: "Graph Search: BFS & DFS",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Implement BFS and DFS",
      "Know when to use each",
      "Apply to path finding and traversal",
    ],
    sections: [
      {
        type: "text",
        content: `BFS (Breadth-First Search) explores level by level; DFS (Depth-First Search) goes as deep as possible first. Both are fundamental for graph problems.`,
      },
      {
        type: "concept",
        title: "BFS vs DFS",
        content: `BFS: uses queue, finds shortest path in unweighted graphs, level-order traversal. DFS: uses stack/recursion, good for detecting cycles, topological sort, solving mazes.`,
      },
      {
        type: "code",
        title: "BFS and DFS",
        language: "python",
        code: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

def dfs(graph, node, visited=None):
    if visited is None: visited = set()
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)`,
      },
    ],
    practices: [
      { id: 1, question: "BFS uses what data structure?", options: ["Stack", "Queue", "Heap", "Array"], correct: 1 },
      { id: 2, question: "For shortest path in unweighted graph, use:", options: ["DFS", "BFS", "Either", "Neither"], correct: 1 },
      { id: 3, question: "DFS can be implemented with:", options: ["Queue only", "Stack or recursion", "Heap only", "Hash table"], correct: 1 },
    ],
  },

  // More algorithm lessons...
  "algorithms/sorting/quicksort": {
    title: "QuickSort",
    duration: "25 min",
    xpReward: 130,
    objectives: [
      "Understand divide-and-conquer sorting",
      "Implement partition and QuickSort",
      "Analyze average and worst-case complexity",
    ],
    sections: [
      {
        type: "text",
        content: `QuickSort is one of the fastest sorting algorithms in practice. It picks a pivot, partitions elements around it, and recursively sorts the partitions.`,
      },
      {
        type: "code",
        title: "QuickSort Implementation",
        language: "python",
        code: `def quicksort(arr, low=0, high=None):
    if high is None: high = len(arr) - 1
    if low < high:
        pivot_idx = partition(arr, low, high)
        quicksort(arr, low, pivot_idx - 1)
        quicksort(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1`,
      },
      {
        type: "math",
        title: "Complexity",
        content: `Average vs worst case:`,
        formula: "\\text{Average: } O(n \\log n) \\quad \\text{Worst: } O(n^2)",
      },
    ],
    practices: [
      { id: 1, question: "QuickSort's average complexity is:", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correct: 1 },
      { id: 2, question: "Worst case occurs when:", options: ["Random pivot", "Already sorted", "Reverse sorted", "B or C"], correct: 3 },
      { id: 3, question: "QuickSort is:", options: ["Stable", "Not stable", "Always O(n log n)", "In-place and stable"], correct: 1 },
    ],
  },

  "algorithms/sorting/mergesort": {
    title: "MergeSort",
    duration: "25 min",
    xpReward: 130,
    objectives: [
      "Implement merge sort",
      "Understand stable sorting",
      "Compare with QuickSort",
    ],
    sections: [
      {
        type: "text",
        content: `MergeSort divides the array in half, recursively sorts each half, then merges them. It guarantees O(n log n) time and is stable (preserves relative order of equal elements).`,
      },
      {
        type: "code",
        title: "MergeSort Implementation",
        language: "python",
        code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]`,
      },
    ],
    practices: [
      { id: 1, question: "MergeSort's worst case is:", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correct: 1 },
      { id: 2, question: "MergeSort is stable because:", options: ["It's fast", "Uses extra memory", "Preserves order of equal elements", "Uses recursion"], correct: 2 },
      { id: 3, question: "MergeSort's main disadvantage:", options: ["Slow", "Unstable", "O(n) extra space", "Not recursive"], correct: 2 },
    ],
  },

  // =========================================
  // NETWORKING & IOT TRACK
  // =========================================

  "networking/protocols/tcp-ip": {
    title: "TCP/IP Fundamentals",
    duration: "30 min",
    xpReward: 130,
    objectives: [
      "Understand the TCP/IP model layers",
      "Explain how data travels across networks",
      "Compare TCP vs UDP",
    ],
    sections: [
      {
        type: "text",
        content: `TCP/IP is the protocol suite that powers the internet. It defines how data is packaged, addressed, transmitted, routed, and received across networks.`,
      },
      {
        type: "concept",
        title: "The Four Layers",
        content: `Application (HTTP, SMTP, FTP) → Transport (TCP/UDP) → Internet (IP) → Network Access (Ethernet, WiFi). Each layer adds headers for its functionality.`,
      },
      {
        type: "code",
        title: "Socket Programming",
        language: "python",
        code: `import socket

# TCP Server
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('localhost', 8080))
server.listen(5)

# TCP Client
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(('localhost', 8080))
client.send(b'Hello, Server!')`,
      },
      {
        type: "concept",
        title: "TCP vs UDP",
        content: `TCP: reliable, ordered, connection-oriented. Used for web, email, file transfer. UDP: fast, no guarantees. Used for streaming, gaming, DNS.`,
      },
    ],
    practices: [
      { id: 1, question: "Which layer handles routing?", options: ["Application", "Transport", "Internet", "Network Access"], correct: 2 },
      { id: 2, question: "TCP provides:", options: ["Speed only", "Reliability", "Broadcasting", "Connectionless"], correct: 1 },
      { id: 3, question: "HTTP operates at which layer?", options: ["Transport", "Internet", "Application", "Physical"], correct: 2 },
    ],
  },

  "networking/protocols/http": {
    title: "HTTP Protocol",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Understand HTTP request/response cycle",
      "Work with HTTP methods and status codes",
      "Implement RESTful APIs",
    ],
    sections: [
      {
        type: "text",
        content: `HTTP (HyperText Transfer Protocol) is how browsers and servers communicate. Understanding it is essential for web development and API design.`,
      },
      {
        type: "concept",
        title: "HTTP Methods",
        content: `GET: retrieve data. POST: create resource. PUT: update resource. DELETE: remove resource. PATCH: partial update. These form the basis of REST APIs.`,
      },
      {
        type: "code",
        title: "Making HTTP Requests",
        language: "python",
        code: `import requests

# GET request
response = requests.get('https://api.example.com/users')
print(response.status_code)  # 200
print(response.json())

# POST request
data = {'name': 'John', 'email': 'john@example.com'}
response = requests.post('https://api.example.com/users', json=data)`,
      },
    ],
    practices: [
      { id: 1, question: "Which method retrieves data?", options: ["POST", "GET", "DELETE", "PUT"], correct: 1 },
      { id: 2, question: "Status code 404 means:", options: ["Success", "Server error", "Not found", "Redirect"], correct: 2 },
      { id: 3, question: "REST stands for:", options: ["Real-time State Transfer", "Representational State Transfer", "Remote System Transfer", "Request-Response State Transfer"], correct: 1 },
    ],
  },

  // More networking lessons...
  "networking/security/encryption": {
    title: "Encryption Basics",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Understand symmetric vs asymmetric encryption",
      "Know when to use each type",
      "Apply HTTPS and TLS concepts",
    ],
    sections: [
      {
        type: "text",
        content: `Encryption protects data from unauthorized access. It's fundamental to secure communication, authentication, and data storage.`,
      },
      {
        type: "concept",
        title: "Symmetric vs Asymmetric",
        content: `Symmetric: same key for encrypt/decrypt (AES). Fast but key distribution problem. Asymmetric: public/private key pairs (RSA). Slower but solves key distribution.`,
      },
      {
        type: "code",
        title: "Simple Encryption with Python",
        language: "python",
        code: `from cryptography.fernet import Fernet

# Generate key
key = Fernet.generate_key()
cipher = Fernet(key)

# Encrypt
message = b"Secret message"
encrypted = cipher.encrypt(message)

# Decrypt
decrypted = cipher.decrypt(encrypted)`,
      },
    ],
    practices: [
      { id: 1, question: "HTTPS uses:", options: ["Only symmetric", "Only asymmetric", "Both (TLS)", "No encryption"], correct: 2 },
      { id: 2, question: "Public key can be:", options: ["Shared freely", "Kept secret", "Used only once", "Ignored"], correct: 0 },
      { id: 3, question: "AES is:", options: ["Asymmetric", "Symmetric", "Hash function", "Protocol"], correct: 1 },
    ],
  },

  "networking/iot/mqtt": {
    title: "MQTT Protocol",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Understand publish-subscribe pattern",
      "Implement MQTT clients",
      "Design IoT communication",
    ],
    sections: [
      {
        type: "text",
        content: `MQTT is a lightweight messaging protocol designed for IoT. It uses publish-subscribe pattern, making it perfect for resource-constrained devices and unreliable networks.`,
      },
      {
        type: "concept",
        title: "Pub-Sub Architecture",
        content: `Publishers send messages to topics; subscribers listen to topics. The broker handles routing. Decouples senders from receivers for scalable IoT systems.`,
      },
      {
        type: "code",
        title: "MQTT Example",
        language: "python",
        code: `import paho.mqtt.client as mqtt

def on_message(client, userdata, msg):
    print(f"{msg.topic}: {msg.payload.decode()}")

client = mqtt.Client()
client.on_message = on_message
client.connect("broker.hivemq.com", 1883)
client.subscribe("sensors/temperature")
client.publish("sensors/temperature", "22.5")
client.loop_forever()`,
      },
    ],
    practices: [
      { id: 1, question: "MQTT stands for:", options: ["Message Queue Telemetry Transport", "Multi-Queue Transfer Technology", "Messaging Queue Topic Transfer", "Micro Queue Transport Type"], correct: 0 },
      { id: 2, question: "In MQTT, the broker:", options: ["Sends data only", "Receives data only", "Routes messages", "Stores data"], correct: 2 },
      { id: 3, question: "MQTT is designed for:", options: ["High bandwidth", "Low bandwidth IoT", "File transfer", "Video streaming"], correct: 1 },
    ],
  },

  // =========================================
  // CYBERSECURITY TRACK
  // =========================================

  "cybersecurity/fundamentals/security-principles": {
    title: "Security Principles",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Understand CIA triad",
      "Apply defense in depth",
      "Recognize common threats",
    ],
    sections: [
      {
        type: "text",
        content: `Cybersecurity protects systems, networks, and data from digital attacks. Understanding core principles helps design secure systems from the ground up.`,
      },
      {
        type: "concept",
        title: "The CIA Triad",
        content: `Confidentiality: only authorized access. Integrity: data is accurate and unmodified. Availability: systems are accessible when needed. All security measures support these three goals.`,
      },
      {
        type: "concept",
        title: "Defense in Depth",
        content: `Layer multiple security controls. If one fails, others protect. Examples: firewalls + encryption + access control + monitoring + backups.`,
      },
    ],
    practices: [
      { id: 1, question: "CIA stands for:", options: ["Central Intelligence Agency", "Confidentiality Integrity Availability", "Computer Information Access", "Cyber Intelligence Analysis"], correct: 1 },
      { id: 2, question: "Defense in depth uses:", options: ["Single strong control", "Multiple layers", "Only encryption", "Just firewalls"], correct: 1 },
      { id: 3, question: "Availability ensures:", options: ["Data is secret", "Data is correct", "Systems are accessible", "Users are authenticated"], correct: 2 },
    ],
  },

  "cybersecurity/fundamentals/authentication": {
    title: "Authentication & Authorization",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Implement secure authentication",
      "Understand OAuth and JWT",
      "Apply role-based access control",
    ],
    sections: [
      {
        type: "text",
        content: `Authentication verifies identity (who are you?); authorization determines permissions (what can you do?). Both are crucial for secure applications.`,
      },
      {
        type: "concept",
        title: "Multi-Factor Authentication",
        content: `Something you know (password) + something you have (phone) + something you are (fingerprint). MFA dramatically reduces account compromise.`,
      },
      {
        type: "code",
        title: "JWT Authentication",
        language: "python",
        code: `import jwt

# Create token
payload = {'user_id': 123, 'exp': datetime.utcnow() + timedelta(hours=1)}
token = jwt.encode(payload, 'secret_key', algorithm='HS256')

# Verify token
try:
    decoded = jwt.decode(token, 'secret_key', algorithms=['HS256'])
    print(decoded['user_id'])
except jwt.ExpiredSignatureError:
    print("Token expired")`,
      },
    ],
    practices: [
      { id: 1, question: "Authentication answers:", options: ["What can you do?", "Who are you?", "Where are you?", "When did you login?"], correct: 1 },
      { id: 2, question: "JWT stands for:", options: ["Java Web Token", "JSON Web Token", "JavaScript Web Transfer", "Joint Web Technology"], correct: 1 },
      { id: 3, question: "MFA uses:", options: ["One factor", "Two factors only", "Multiple factors", "No factors"], correct: 2 },
    ],
  },

  "cybersecurity/web/owasp-top10": {
    title: "OWASP Top 10",
    duration: "35 min",
    xpReward: 160,
    objectives: [
      "Identify common web vulnerabilities",
      "Prevent SQL injection and XSS",
      "Apply secure coding practices",
    ],
    sections: [
      {
        type: "text",
        content: `OWASP Top 10 lists the most critical web application security risks. Understanding and preventing these is essential for any web developer.`,
      },
      {
        type: "concept",
        title: "Key Vulnerabilities",
        content: `Injection (SQL, command), Broken Authentication, XSS, Insecure Direct Object References, Security Misconfiguration. Each can lead to data breach or system compromise.`,
      },
      {
        type: "code",
        title: "Preventing SQL Injection",
        language: "python",
        code: `# VULNERABLE - Never do this!
query = f"SELECT * FROM users WHERE id = {user_input}"

# SAFE - Use parameterized queries
cursor.execute("SELECT * FROM users WHERE id = ?", (user_input,))

# Or use ORM
user = User.query.filter_by(id=user_input).first()`,
      },
    ],
    practices: [
      { id: 1, question: "SQL injection is prevented by:", options: ["Strong passwords", "Parameterized queries", "HTTPS", "Firewalls"], correct: 1 },
      { id: 2, question: "XSS affects:", options: ["Database", "Server", "Client/Browser", "Network"], correct: 2 },
      { id: 3, question: "OWASP is:", options: ["A company", "A nonprofit security community", "A government agency", "An encryption algorithm"], correct: 1 },
    ],
  },

  "cybersecurity/web/secure-coding": {
    title: "Secure Coding Practices",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Validate and sanitize input",
      "Handle errors securely",
      "Manage secrets properly",
    ],
    sections: [
      {
        type: "text",
        content: `Secure coding prevents vulnerabilities from entering your codebase. It's cheaper to write secure code than to fix security issues later.`,
      },
      {
        type: "concept",
        title: "Input Validation",
        content: `Never trust user input. Validate type, length, format, and range. Sanitize before display. Reject rather than sanitize when possible.`,
      },
      {
        type: "code",
        title: "Secure Input Handling",
        language: "python",
        code: `import re
from html import escape

def validate_email(email):
    pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    if not re.match(pattern, email):
        raise ValueError("Invalid email")
    return email

def sanitize_for_html(user_input):
    return escape(user_input)  # Prevents XSS`,
      },
      {
        type: "concept",
        title: "Secret Management",
        content: `Never hardcode secrets. Use environment variables or secret managers. Rotate secrets regularly. Different secrets for dev/prod.`,
      },
    ],
    practices: [
      { id: 1, question: "Input validation should:", options: ["Trust user input", "Reject invalid input", "Only check client-side", "Ignore edge cases"], correct: 1 },
      { id: 2, question: "Secrets should be:", options: ["In source code", "In environment variables", "Shared publicly", "Hardcoded"], correct: 1 },
      { id: 3, question: "Error messages should:", options: ["Show stack traces", "Be generic to users", "Include passwords", "Show SQL queries"], correct: 1 },
    ],
  },

  // =========================================
  // SYSTEM ARCHITECTURE TRACK
  // =========================================

  "systems/architecture/microservices": {
    title: "Microservices Architecture",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Compare monolith vs microservices",
      "Design service boundaries",
      "Handle inter-service communication",
    ],
    sections: [
      {
        type: "text",
        content: `Microservices decompose applications into small, independent services. Each service owns its data and can be deployed independently, enabling scalability and team autonomy.`,
      },
      {
        type: "concept",
        title: "When to Use Microservices",
        content: `Good for: large teams, independent scaling needs, polyglot tech stacks. Bad for: small teams, simple apps, tight deadlines. Start monolith, extract services as needed.`,
      },
      {
        type: "concept",
        title: "Communication Patterns",
        content: `Synchronous: REST, gRPC (request-response). Asynchronous: message queues, event streaming (decoupled, resilient). Choose based on consistency and latency requirements.`,
      },
    ],
    practices: [
      { id: 1, question: "Microservices enable:", options: ["Faster initial development", "Independent deployment", "Simpler debugging", "Less infrastructure"], correct: 1 },
      { id: 2, question: "Each microservice should:", options: ["Share database", "Own its data", "Use same language", "Be huge"], correct: 1 },
      { id: 3, question: "Best for small team starting out:", options: ["Microservices", "Monolith", "Serverless only", "No backend"], correct: 1 },
    ],
  },

  "systems/architecture/scalability": {
    title: "Scalability Patterns",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Design for horizontal scaling",
      "Implement caching strategies",
      "Handle database scaling",
    ],
    sections: [
      {
        type: "text",
        content: `Scalability is the ability to handle growing load. Horizontal scaling (more machines) is generally preferred over vertical (bigger machines) for resilience and cost.`,
      },
      {
        type: "concept",
        title: "Caching",
        content: `Cache reduces database load and latency. Levels: browser cache, CDN, application cache (Redis), database cache. Invalidation is the hard part—TTL or event-based.`,
      },
      {
        type: "concept",
        title: "Database Scaling",
        content: `Read replicas handle read load. Sharding partitions data across databases. NoSQL offers horizontal scaling. Choose based on data model and consistency needs.`,
      },
    ],
    practices: [
      { id: 1, question: "Horizontal scaling means:", options: ["Bigger server", "More servers", "Faster CPU", "More RAM"], correct: 1 },
      { id: 2, question: "Redis is commonly used for:", options: ["Primary database", "Caching", "File storage", "ML training"], correct: 1 },
      { id: 3, question: "Sharding helps with:", options: ["Caching", "Write scalability", "Code organization", "Security"], correct: 1 },
    ],
  },

  "systems/architecture/reliability": {
    title: "Reliability & Resilience",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Design for failure",
      "Implement circuit breakers",
      "Apply chaos engineering principles",
    ],
    sections: [
      {
        type: "text",
        content: `In distributed systems, failures are inevitable. Resilient systems gracefully handle failures, recover quickly, and minimize user impact.`,
      },
      {
        type: "concept",
        title: "Circuit Breaker Pattern",
        content: `When a service fails repeatedly, "open" the circuit to fail fast instead of timing out. Periodically test if service recovered. Prevents cascade failures.`,
      },
      {
        type: "concept",
        title: "Redundancy",
        content: `Multiple instances behind load balancers. Multi-region deployment for disaster recovery. Data replication. No single points of failure.`,
      },
    ],
    practices: [
      { id: 1, question: "Circuit breaker prevents:", options: ["All failures", "Cascade failures", "Network issues", "Code bugs"], correct: 1 },
      { id: 2, question: "Chaos engineering:", options: ["Causes production bugs", "Tests resilience by injecting failures", "Is only for large companies", "Replaces testing"], correct: 1 },
      { id: 3, question: "MTTR stands for:", options: ["Mean Time To Repair", "Maximum Time To Respond", "Minimum Time To Restart", "Mean Total Technical Resources"], correct: 0 },
    ],
  },

  "systems/architecture/event-driven": {
    title: "Event-Driven Architecture",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Design event-driven systems",
      "Use message queues effectively",
      "Apply event sourcing patterns",
    ],
    sections: [
      {
        type: "text",
        content: `Event-driven architecture uses events to trigger and communicate between decoupled services. It enables real-time processing, scalability, and loose coupling.`,
      },
      {
        type: "concept",
        title: "Event Sourcing",
        content: `Store events as the source of truth, not current state. Replay events to reconstruct state. Enables audit logs, time travel, and complex event processing.`,
      },
      {
        type: "concept",
        title: "Message Queues",
        content: `RabbitMQ, Kafka, SQS decouple producers from consumers. Provides buffering, retry, and ordering guarantees. Essential for async processing.`,
      },
    ],
    practices: [
      { id: 1, question: "Event-driven enables:", options: ["Tight coupling", "Loose coupling", "Synchronous only", "No scalability"], correct: 1 },
      { id: 2, question: "Kafka is used for:", options: ["Caching", "Event streaming", "SQL queries", "File storage"], correct: 1 },
      { id: 3, question: "Event sourcing stores:", options: ["Current state only", "Events as source of truth", "No data", "Only deletes"], correct: 1 },
    ],
  },

  // =========================================
  // BLOCKCHAIN TRACK
  // =========================================

  "blockchain/fundamentals/blockchain-intro": {
    title: "What is Blockchain?",
    duration: "20 min",
    xpReward: 100,
    objectives: [
      "Understand the concept of a distributed ledger",
      "Explain how blocks are chained together",
      "Recognize key properties: immutability, transparency, decentralization",
    ],
    sections: [
      {
        type: "text",
        content: `A blockchain is a distributed, immutable ledger that records transactions across a network of computers. No single entity controls it, and once data is written, it cannot be altered without consensus from the network.`,
      },
      {
        type: "concept",
        title: "How Blocks Are Linked",
        content: `Each block contains a hash of the previous block, creating an unbreakable chain. Changing any block would invalidate all subsequent hashes, making tampering detectable.`,
      },
      {
        type: "math",
        title: "Hash Function",
        content: `A cryptographic hash maps arbitrary data to a fixed-size output:`,
        formula: "H(\\text{block data}) \\rightarrow \\text{256-bit hash}",
      },
      {
        type: "code",
        title: "Simple Block in Python",
        language: "python",
        code: `import hashlib, json, time

class Block:
    def __init__(self, index, data, prev_hash):
        self.index = index
        self.timestamp = time.time()
        self.data = data
        self.prev_hash = prev_hash
        self.hash = self.compute_hash()

    def compute_hash(self):
        block_str = json.dumps(self.__dict__, sort_keys=True)
        return hashlib.sha256(block_str.encode()).hexdigest()`,
      },
    ],
    practices: [
      { id: 1, question: "A blockchain is:", options: ["A centralized database", "A distributed ledger", "A programming language", "A cloud server"], correct: 1 },
      { id: 2, question: "Each block contains:", options: ["Only transactions", "A hash of the next block", "A hash of the previous block", "No metadata"], correct: 2 },
      { id: 3, question: "Immutability means:", options: ["Data can be changed freely", "Data cannot be altered once written", "Data is encrypted", "Data is deleted periodically"], correct: 1 },
    ],
  },

  "blockchain/fundamentals/consensus": {
    title: "Consensus Mechanisms",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Compare Proof of Work vs Proof of Stake",
      "Understand the Byzantine Generals Problem",
      "Evaluate energy and security tradeoffs",
    ],
    sections: [
      {
        type: "text",
        content: `Consensus mechanisms allow distributed networks to agree on the state of the ledger without a central authority. They solve the fundamental problem of trust in decentralized systems.`,
      },
      {
        type: "concept",
        title: "Proof of Work (PoW)",
        content: `Miners compete to solve a computational puzzle. The first to find a valid hash gets to add the block and earn a reward. Secure but energy-intensive—Bitcoin uses PoW.`,
      },
      {
        type: "concept",
        title: "Proof of Stake (PoS)",
        content: `Validators lock up tokens as collateral. They're selected to propose blocks based on stake size. Much more energy-efficient—Ethereum switched to PoS in 2022.`,
      },
      {
        type: "math",
        title: "Mining Difficulty",
        content: `PoW requires finding a hash below a target value:`,
        formula: "H(\\text{nonce} \\| \\text{block}) < \\text{target} \\quad \\text{where target} \\propto \\frac{1}{\\text{difficulty}}",
      },
    ],
    practices: [
      { id: 1, question: "Bitcoin uses:", options: ["Proof of Stake", "Proof of Work", "Proof of Authority", "No consensus"], correct: 1 },
      { id: 2, question: "PoS is more:", options: ["Energy-intensive", "Energy-efficient", "Centralized", "Insecure"], correct: 1 },
      { id: 3, question: "The Byzantine Generals Problem is about:", options: ["Military strategy", "Achieving consensus with untrusted parties", "Encryption", "Database design"], correct: 1 },
    ],
  },

  "blockchain/smart-contracts/solidity-basics": {
    title: "Smart Contracts & Solidity",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Understand what smart contracts are",
      "Write basic Solidity code",
      "Deploy and interact with contracts",
    ],
    sections: [
      {
        type: "text",
        content: `Smart contracts are self-executing programs stored on the blockchain. They automatically enforce rules and execute actions when conditions are met—no intermediary needed.`,
      },
      {
        type: "concept",
        title: "Why Smart Contracts?",
        content: `Traditional contracts need lawyers and courts. Smart contracts execute automatically, are transparent, immutable, and trustless. They power DeFi, NFTs, and DAOs.`,
      },
      {
        type: "code",
        title: "Basic Solidity Contract",
        language: "solidity",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedValue;
    
    event ValueChanged(uint256 newValue);
    
    function set(uint256 value) public {
        storedValue = value;
        emit ValueChanged(value);
    }
    
    function get() public view returns (uint256) {
        return storedValue;
    }
}`,
      },
    ],
    practices: [
      { id: 1, question: "Smart contracts run on:", options: ["Local servers", "The blockchain", "Cloud only", "User devices"], correct: 1 },
      { id: 2, question: "Solidity is used for:", options: ["Bitcoin", "Ethereum smart contracts", "Web servers", "Machine learning"], correct: 1 },
      { id: 3, question: "Smart contracts are:", options: ["Mutable", "Immutable once deployed", "Centralized", "Free to execute"], correct: 1 },
    ],
  },

  "blockchain/smart-contracts/defi": {
    title: "DeFi & Token Standards",
    duration: "25 min",
    xpReward: 130,
    objectives: [
      "Understand ERC-20 and ERC-721 standards",
      "Explore DeFi concepts: lending, AMMs, yield",
      "Recognize risks in DeFi protocols",
    ],
    sections: [
      {
        type: "text",
        content: `Decentralized Finance (DeFi) rebuilds traditional financial services on blockchain. Lending, borrowing, trading, and insurance—all without banks or intermediaries.`,
      },
      {
        type: "concept",
        title: "Token Standards",
        content: `ERC-20: fungible tokens (currencies, utility tokens). ERC-721: non-fungible tokens (NFTs, unique assets). ERC-1155: multi-token standard (gaming items). Standards ensure interoperability.`,
      },
      {
        type: "code",
        title: "ERC-20 Token",
        language: "solidity",
        code: `// Minimal ERC-20 interface
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}`,
      },
      {
        type: "concept",
        title: "Automated Market Makers",
        content: `AMMs like Uniswap replace order books with liquidity pools. Price is determined by a formula (x·y=k). Anyone can provide liquidity and earn fees.`,
      },
    ],
    practices: [
      { id: 1, question: "ERC-721 is for:", options: ["Fungible tokens", "Non-fungible tokens", "Stablecoins", "Gas fees"], correct: 1 },
      { id: 2, question: "An AMM uses:", options: ["Order books", "Liquidity pools", "Central exchanges", "Banks"], correct: 1 },
      { id: 3, question: "DeFi stands for:", options: ["Defined Finance", "Decentralized Finance", "Default Finance", "Deferred Finance"], correct: 1 },
    ],
  },

  // =========================================
  // IOT TRACK
  // =========================================

  "iot/fundamentals/iot-intro": {
    title: "Introduction to IoT",
    duration: "20 min",
    xpReward: 100,
    objectives: [
      "Define the Internet of Things",
      "Identify IoT components: sensors, actuators, gateways",
      "Recognize IoT applications across industries",
    ],
    sections: [
      {
        type: "text",
        content: `The Internet of Things connects physical devices to the internet, enabling them to collect and exchange data. From smart homes to industrial automation, IoT is transforming how we interact with the physical world.`,
      },
      {
        type: "concept",
        title: "IoT Architecture",
        content: `Perception Layer (sensors/actuators) → Network Layer (communication) → Processing Layer (edge/cloud computing) → Application Layer (dashboards, automation). Each layer has unique challenges.`,
      },
      {
        type: "concept",
        title: "Common IoT Protocols",
        content: `MQTT: lightweight pub/sub messaging. CoAP: REST-like for constrained devices. BLE: short-range low-power. LoRaWAN: long-range low-power. ZigBee: mesh networking for smart homes.`,
      },
      {
        type: "code",
        title: "Reading Sensor Data (Python)",
        language: "python",
        code: `import time
import random

class TemperatureSensor:
    def __init__(self, sensor_id):
        self.sensor_id = sensor_id
    
    def read(self):
        # Simulate sensor reading
        return {
            "sensor_id": self.sensor_id,
            "temperature": round(20 + random.gauss(0, 2), 1),
            "timestamp": time.time(),
            "unit": "celsius"
        }

sensor = TemperatureSensor("temp-001")
reading = sensor.read()
print(f"Temp: {reading['temperature']}°C")`,
      },
    ],
    practices: [
      { id: 1, question: "IoT stands for:", options: ["Internet of Technology", "Internet of Things", "Integration of Tools", "Interface of Terminals"], correct: 1 },
      { id: 2, question: "Sensors are part of which layer?", options: ["Application", "Network", "Perception", "Processing"], correct: 2 },
      { id: 3, question: "MQTT is designed for:", options: ["High bandwidth video", "Lightweight IoT messaging", "File transfer", "Web browsing"], correct: 1 },
    ],
  },

  "iot/fundamentals/sensors-actuators": {
    title: "Sensors & Actuators",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Distinguish between analog and digital sensors",
      "Interface with common sensor types",
      "Control actuators based on sensor data",
    ],
    sections: [
      {
        type: "text",
        content: `Sensors convert physical phenomena into electrical signals; actuators convert electrical signals into physical actions. Together they form the bridge between digital systems and the physical world.`,
      },
      {
        type: "concept",
        title: "Common Sensor Types",
        content: `Temperature (DHT22, DS18B20), Humidity, Light (LDR, photodiode), Motion (PIR, accelerometer), Distance (ultrasonic, LiDAR), Gas (MQ series). Each has different accuracy, range, and power needs.`,
      },
      {
        type: "code",
        title: "Sensor-Actuator Loop",
        language: "python",
        code: `class Thermostat:
    def __init__(self, target_temp=22.0):
        self.target = target_temp
        self.heater_on = False

    def update(self, current_temp):
        if current_temp < self.target - 0.5:
            self.heater_on = True
            return "HEATING"
        elif current_temp > self.target + 0.5:
            self.heater_on = False
            return "COOLING"
        return "STABLE"

thermostat = Thermostat(22.0)
print(thermostat.update(20.0))  # HEATING`,
      },
    ],
    practices: [
      { id: 1, question: "An actuator:", options: ["Reads data", "Converts signals to physical action", "Stores data", "Transmits wirelessly"], correct: 1 },
      { id: 2, question: "ADC converts:", options: ["Digital to analog", "Analog to digital", "AC to DC", "Data to code"], correct: 1 },
      { id: 3, question: "A PIR sensor detects:", options: ["Temperature", "Motion", "Light", "Sound"], correct: 1 },
    ],
  },

  "iot/edge-computing/edge-intro": {
    title: "Edge Computing",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Understand edge vs cloud computing",
      "Identify when to process at the edge",
      "Design edge computing architectures",
    ],
    sections: [
      {
        type: "text",
        content: `Edge computing processes data near the source instead of sending everything to the cloud. This reduces latency, bandwidth costs, and enables real-time decisions for IoT applications.`,
      },
      {
        type: "concept",
        title: "Why Edge Computing?",
        content: `Latency: real-time decisions can't wait for cloud roundtrip. Bandwidth: sending all raw sensor data is expensive. Privacy: sensitive data stays local. Reliability: works even without internet.`,
      },
      {
        type: "concept",
        title: "Edge Architecture",
        content: `Devices → Edge Gateway (filter, aggregate, local ML inference) → Cloud (long-term storage, training, analytics). Process locally what you can, send to cloud what you must.`,
      },
    ],
    practices: [
      { id: 1, question: "Edge computing processes data:", options: ["In the cloud only", "Near the data source", "On user phones", "In data centers"], correct: 1 },
      { id: 2, question: "Main benefit of edge for IoT:", options: ["More storage", "Lower latency", "Better graphics", "Cheaper hardware"], correct: 1 },
      { id: 3, question: "Edge computing reduces:", options: ["Security", "Bandwidth to cloud", "Local processing", "Sensor accuracy"], correct: 1 },
    ],
  },

  "iot/edge-computing/iot-security": {
    title: "IoT Security",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Identify IoT-specific security threats",
      "Implement device authentication",
      "Apply encryption for IoT communication",
    ],
    sections: [
      {
        type: "text",
        content: `IoT devices are attractive targets: they're often resource-constrained, deployed in physical locations, and connected to critical systems. Security must be designed in from the start.`,
      },
      {
        type: "concept",
        title: "IoT Threat Landscape",
        content: `Device tampering, firmware attacks, man-in-the-middle, botnet recruitment (Mirai), default credentials, unencrypted communication. Each IoT device is a potential entry point.`,
      },
      {
        type: "code",
        title: "Secure MQTT with TLS",
        language: "python",
        code: `import paho.mqtt.client as mqtt
import ssl

client = mqtt.Client()

# Enable TLS encryption
client.tls_set(
    ca_certs="ca.crt",
    certfile="client.crt",
    keyfile="client.key",
    tls_version=ssl.PROTOCOL_TLSv1_2
)

# Authenticate
client.username_pw_set("device_001", "secure_token")
client.connect("iot-broker.example.com", 8883)`,
      },
      {
        type: "concept",
        title: "Security Best Practices",
        content: `Unique credentials per device. Encrypted communication (TLS/DTLS). Secure boot. Regular firmware updates. Network segmentation. Principle of least privilege.`,
      },
    ],
    practices: [
      { id: 1, question: "Mirai botnet targeted:", options: ["Servers", "IoT devices", "Phones", "Laptops"], correct: 1 },
      { id: 2, question: "IoT devices should use:", options: ["Default passwords", "Unique credentials", "No authentication", "Shared passwords"], correct: 1 },
      { id: 3, question: "Secure boot ensures:", options: ["Fast startup", "Only trusted firmware runs", "Wireless connectivity", "Low power usage"], correct: 1 },
    ],
  },

  // =========================================
  // BIG DATA TRACK
  // =========================================

  "bigdata/fundamentals/bigdata-intro": {
    title: "Introduction to Big Data",
    duration: "20 min",
    xpReward: 100,
    objectives: [
      "Define Big Data and the 5 Vs",
      "Understand distributed computing concepts",
      "Recognize Big Data use cases",
    ],
    sections: [
      {
        type: "text",
        content: `Big Data refers to datasets too large or complex for traditional tools. It's characterized by the 5 Vs: Volume, Velocity, Variety, Veracity, and Value. Processing it requires distributed systems.`,
      },
      {
        type: "concept",
        title: "The 5 Vs of Big Data",
        content: `Volume: terabytes to petabytes. Velocity: real-time streaming data. Variety: structured, semi-structured, unstructured. Veracity: data quality and accuracy. Value: extracting actionable insights.`,
      },
      {
        type: "concept",
        title: "Distributed Computing",
        content: `Single machines can't handle Big Data. Distributed systems split work across clusters. Key frameworks: Hadoop (batch), Spark (batch + streaming), Flink (real-time streaming).`,
      },
    ],
    practices: [
      { id: 1, question: "The 5 Vs include:", options: ["Volume, Velocity, Variety", "Version, Value, Virtual", "Vector, Volume, Visual", "Variable, Velocity, Void"], correct: 0 },
      { id: 2, question: "Big Data requires:", options: ["Single powerful server", "Distributed computing", "Only cloud storage", "No special tools"], correct: 1 },
      { id: 3, question: "Apache Spark is used for:", options: ["Web hosting", "Big Data processing", "Mobile apps", "Email"], correct: 1 },
    ],
  },

  "bigdata/fundamentals/mapreduce": {
    title: "MapReduce Paradigm",
    duration: "25 min",
    xpReward: 120,
    objectives: [
      "Understand the Map and Reduce operations",
      "Implement MapReduce for common tasks",
      "Recognize when MapReduce applies",
    ],
    sections: [
      {
        type: "text",
        content: `MapReduce is a programming model for processing large datasets in parallel. Map transforms data into key-value pairs; Reduce aggregates values by key. It's the foundation of distributed data processing.`,
      },
      {
        type: "concept",
        title: "How MapReduce Works",
        content: `1. Split: data divided across nodes. 2. Map: each node processes its chunk, emitting key-value pairs. 3. Shuffle: pairs grouped by key. 4. Reduce: aggregate values per key. Parallelism is automatic.`,
      },
      {
        type: "code",
        title: "Word Count with MapReduce",
        language: "python",
        code: `from collections import defaultdict

def map_function(document):
    """Emit (word, 1) for each word"""
    pairs = []
    for word in document.lower().split():
        pairs.append((word, 1))
    return pairs

def reduce_function(key, values):
    """Sum all counts for each word"""
    return (key, sum(values))

# Simulate MapReduce
doc = "hello world hello big data world"
mapped = map_function(doc)

# Shuffle phase
groups = defaultdict(list)
for key, value in mapped:
    groups[key].append(value)

# Reduce phase
results = [reduce_function(k, v) for k, v in groups.items()]
print(results)  # [('hello', 2), ('world', 2), ('big', 1), ('data', 1)]`,
      },
    ],
    practices: [
      { id: 1, question: "Map phase produces:", options: ["Aggregated results", "Key-value pairs", "Sorted data", "Filtered rows"], correct: 1 },
      { id: 2, question: "Reduce phase does:", options: ["Splits data", "Aggregates by key", "Stores to disk", "Sorts alphabetically"], correct: 1 },
      { id: 3, question: "MapReduce was popularized by:", options: ["Facebook", "Google", "Amazon", "Microsoft"], correct: 1 },
    ],
  },

  "bigdata/processing/spark-intro": {
    title: "Apache Spark",
    duration: "30 min",
    xpReward: 140,
    objectives: [
      "Understand Spark's in-memory processing",
      "Work with RDDs and DataFrames",
      "Compare Spark vs Hadoop MapReduce",
    ],
    sections: [
      {
        type: "text",
        content: `Apache Spark processes data up to 100x faster than Hadoop MapReduce by keeping data in memory. It supports batch processing, streaming, ML, and graph computation in a unified engine.`,
      },
      {
        type: "concept",
        title: "Spark Architecture",
        content: `Driver Program → Cluster Manager → Worker Nodes. Data is organized as RDDs (Resilient Distributed Datasets) or DataFrames. Lazy evaluation: transformations build a plan, actions trigger execution.`,
      },
      {
        type: "code",
        title: "PySpark Example",
        language: "python",
        code: `from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("BigDataDemo").getOrCreate()

# Read data
df = spark.read.csv("sales.csv", header=True, inferSchema=True)

# Transformations (lazy)
result = (df
    .groupBy("category")
    .agg({"revenue": "sum", "quantity": "avg"})
    .orderBy("sum(revenue)", ascending=False))

# Action (triggers execution)
result.show()`,
      },
    ],
    practices: [
      { id: 1, question: "Spark is faster than MapReduce because:", options: ["Better algorithms", "In-memory processing", "Newer hardware", "Simpler code"], correct: 1 },
      { id: 2, question: "Spark transformations are:", options: ["Eagerly evaluated", "Lazily evaluated", "Never evaluated", "Randomly evaluated"], correct: 1 },
      { id: 3, question: "An RDD stands for:", options: ["Random Data Distribution", "Resilient Distributed Dataset", "Real-time Data Driver", "Reduced Data Dimension"], correct: 1 },
    ],
  },

  "bigdata/processing/data-pipelines": {
    title: "Data Pipelines & ETL",
    duration: "25 min",
    xpReward: 130,
    objectives: [
      "Design Extract-Transform-Load workflows",
      "Understand batch vs streaming pipelines",
      "Apply data quality checks",
    ],
    sections: [
      {
        type: "text",
        content: `Data pipelines move and transform data from sources to destinations. ETL (Extract, Transform, Load) is the classic pattern, while modern approaches often use ELT with data warehouses.`,
      },
      {
        type: "concept",
        title: "Batch vs Streaming",
        content: `Batch: process data in scheduled chunks (hourly/daily). Good for reports, analytics. Streaming: process data as it arrives. Good for real-time dashboards, alerts, fraud detection.`,
      },
      {
        type: "code",
        title: "Simple ETL Pipeline",
        language: "python",
        code: `import pandas as pd

# Extract
raw_data = pd.read_csv("raw_events.csv")

# Transform
cleaned = (raw_data
    .dropna(subset=["user_id", "event_type"])
    .assign(
        event_date=lambda df: pd.to_datetime(df["timestamp"]).dt.date,
        event_type=lambda df: df["event_type"].str.lower()
    )
    .query("event_type in ['click', 'purchase', 'view']"))

# Load
cleaned.to_parquet("processed_events.parquet", index=False)
print(f"Processed {len(cleaned)} / {len(raw_data)} events")`,
      },
      {
        type: "concept",
        title: "Data Quality",
        content: `Validate completeness (no missing fields), accuracy (correct values), consistency (matching across sources), timeliness (fresh data). Build checks into every pipeline stage.`,
      },
    ],
    practices: [
      { id: 1, question: "ETL stands for:", options: ["Edit Transfer Load", "Extract Transform Load", "Evaluate Test Log", "Export Transpose Link"], correct: 1 },
      { id: 2, question: "Streaming pipelines process:", options: ["Data in batches", "Data as it arrives", "Only files", "Only databases"], correct: 1 },
      { id: 3, question: "Data quality checks should be:", options: ["Optional", "At the end only", "At every stage", "Only for production"], correct: 2 },
    ],
  },
};

// Get all lessons in order for navigation
export const allLessons: LessonMetadata[] = [
  // Foundation - Number Systems
  { id: "foundation/number-systems/binary-intro", title: "Introduction to Binary", duration: "15 min", trackId: "foundation", moduleId: "number-systems", trackTitle: "Foundation" },
  { id: "foundation/number-systems/binary-arithmetic", title: "Binary Arithmetic", duration: "20 min", trackId: "foundation", moduleId: "number-systems", trackTitle: "Foundation" },
  { id: "foundation/number-systems/hexadecimal", title: "Hexadecimal & Octal", duration: "18 min", trackId: "foundation", moduleId: "number-systems", trackTitle: "Foundation" },
  // Foundation - Boolean Algebra
  { id: "foundation/boolean-algebra/logic-gates", title: "Logic Gates Fundamentals", duration: "20 min", trackId: "foundation", moduleId: "boolean-algebra", trackTitle: "Foundation" },
  { id: "foundation/boolean-algebra/truth-tables", title: "Truth Tables & Expressions", duration: "22 min", trackId: "foundation", moduleId: "boolean-algebra", trackTitle: "Foundation" },
  { id: "foundation/boolean-algebra/boolean-laws", title: "Boolean Laws & Simplification", duration: "25 min", trackId: "foundation", moduleId: "boolean-algebra", trackTitle: "Foundation" },
  // Foundation - Set Theory
  { id: "foundation/set-theory/sets-intro", title: "Introduction to Sets", duration: "15 min", trackId: "foundation", moduleId: "set-theory", trackTitle: "Foundation" },
  { id: "foundation/set-theory/set-operations", title: "Set Operations", duration: "20 min", trackId: "foundation", moduleId: "set-theory", trackTitle: "Foundation" },
  { id: "foundation/set-theory/relations", title: "Relations & Functions", duration: "25 min", trackId: "foundation", moduleId: "set-theory", trackTitle: "Foundation" },

  // Core Programming - Linear Algebra
  { id: "core/linear-algebra/vectors-intro", title: "Introduction to Vectors", duration: "20 min", trackId: "core", moduleId: "linear-algebra", trackTitle: "Core Programming" },
  { id: "core/linear-algebra/matrices-intro", title: "Introduction to Matrices", duration: "25 min", trackId: "core", moduleId: "linear-algebra", trackTitle: "Core Programming" },
  { id: "core/linear-algebra/matrix-multiplication", title: "Matrix Multiplication", duration: "30 min", trackId: "core", moduleId: "linear-algebra", trackTitle: "Core Programming" },
  { id: "core/linear-algebra/linear-transformations", title: "Linear Transformations", duration: "25 min", trackId: "core", moduleId: "linear-algebra", trackTitle: "Core Programming" },
  // Core Programming - Calculus
  { id: "core/calculus/derivatives-intro", title: "Introduction to Derivatives", duration: "25 min", trackId: "core", moduleId: "calculus", trackTitle: "Core Programming" },
  { id: "core/calculus/gradients", title: "Gradients & Partial Derivatives", duration: "30 min", trackId: "core", moduleId: "calculus", trackTitle: "Core Programming" },
  { id: "core/calculus/chain-rule", title: "Chain Rule & Backpropagation", duration: "35 min", trackId: "core", moduleId: "calculus", trackTitle: "Core Programming" },
  { id: "core/calculus/optimization", title: "Optimization & Gradient Descent", duration: "30 min", trackId: "core", moduleId: "calculus", trackTitle: "Core Programming" },
  // Core Programming - Probability
  { id: "core/probability/probability-basics", title: "Probability Fundamentals", duration: "20 min", trackId: "core", moduleId: "probability", trackTitle: "Core Programming" },
  { id: "core/probability/distributions", title: "Probability Distributions", duration: "25 min", trackId: "core", moduleId: "probability", trackTitle: "Core Programming" },
  { id: "core/probability/statistical-inference", title: "Statistical Inference", duration: "30 min", trackId: "core", moduleId: "probability", trackTitle: "Core Programming" },
  { id: "core/probability/information-theory", title: "Information Theory", duration: "25 min", trackId: "core", moduleId: "probability", trackTitle: "Core Programming" },

  // ML & AI - Fundamentals
  { id: "ml-ai/fundamentals/ml-intro", title: "Introduction to Machine Learning", duration: "20 min", trackId: "ml-ai", moduleId: "fundamentals", trackTitle: "ML & AI" },
  { id: "ml-ai/fundamentals/linear-regression", title: "Linear Regression", duration: "25 min", trackId: "ml-ai", moduleId: "fundamentals", trackTitle: "ML & AI" },
  { id: "ml-ai/fundamentals/logistic-regression", title: "Logistic Regression", duration: "25 min", trackId: "ml-ai", moduleId: "fundamentals", trackTitle: "ML & AI" },
  { id: "ml-ai/fundamentals/overfitting", title: "Overfitting & Regularization", duration: "30 min", trackId: "ml-ai", moduleId: "fundamentals", trackTitle: "ML & AI" },
  // ML & AI - Neural Networks
  { id: "ml-ai/neural-networks/perceptron", title: "The Perceptron", duration: "20 min", trackId: "ml-ai", moduleId: "neural-networks", trackTitle: "ML & AI" },
  { id: "ml-ai/neural-networks/multi-layer", title: "Multi-Layer Networks", duration: "30 min", trackId: "ml-ai", moduleId: "neural-networks", trackTitle: "ML & AI" },
  { id: "ml-ai/neural-networks/training", title: "Training Neural Networks", duration: "35 min", trackId: "ml-ai", moduleId: "neural-networks", trackTitle: "ML & AI" },
  { id: "ml-ai/neural-networks/cnn-intro", title: "Convolutional Neural Networks", duration: "35 min", trackId: "ml-ai", moduleId: "neural-networks", trackTitle: "ML & AI" },
  // ML & AI - Advanced
  { id: "ml-ai/advanced/attention", title: "Attention Mechanisms", duration: "30 min", trackId: "ml-ai", moduleId: "advanced", trackTitle: "ML & AI" },
  { id: "ml-ai/advanced/embeddings", title: "Word Embeddings", duration: "25 min", trackId: "ml-ai", moduleId: "advanced", trackTitle: "ML & AI" },
  { id: "ml-ai/advanced/transfer-learning", title: "Transfer Learning", duration: "25 min", trackId: "ml-ai", moduleId: "advanced", trackTitle: "ML & AI" },
  { id: "ml-ai/advanced/generative-models", title: "Generative Models", duration: "30 min", trackId: "ml-ai", moduleId: "advanced", trackTitle: "ML & AI" },

  // Algorithms & Data Structures
  { id: "algorithms/complexity/big-o", title: "Big O Notation", duration: "25 min", trackId: "algorithms", moduleId: "complexity", trackTitle: "Algorithms" },
  { id: "algorithms/complexity/space-time", title: "Space-Time Tradeoffs", duration: "20 min", trackId: "algorithms", moduleId: "complexity", trackTitle: "Algorithms" },
  { id: "algorithms/searching/binary-search", title: "Binary Search", duration: "20 min", trackId: "algorithms", moduleId: "searching", trackTitle: "Algorithms" },
  { id: "algorithms/searching/graph-search", title: "Graph Search: BFS & DFS", duration: "30 min", trackId: "algorithms", moduleId: "searching", trackTitle: "Algorithms" },
  { id: "algorithms/sorting/quicksort", title: "QuickSort", duration: "25 min", trackId: "algorithms", moduleId: "sorting", trackTitle: "Algorithms" },
  { id: "algorithms/sorting/mergesort", title: "MergeSort", duration: "25 min", trackId: "algorithms", moduleId: "sorting", trackTitle: "Algorithms" },

  // Networking & IoT
  { id: "networking/protocols/tcp-ip", title: "TCP/IP Fundamentals", duration: "30 min", trackId: "networking", moduleId: "protocols", trackTitle: "Networking" },
  { id: "networking/protocols/http", title: "HTTP Protocol", duration: "25 min", trackId: "networking", moduleId: "protocols", trackTitle: "Networking" },
  { id: "networking/security/encryption", title: "Encryption Basics", duration: "30 min", trackId: "networking", moduleId: "security", trackTitle: "Networking" },
  { id: "networking/iot/mqtt", title: "MQTT Protocol", duration: "25 min", trackId: "networking", moduleId: "iot", trackTitle: "Networking" },

  // Cybersecurity
  { id: "cybersecurity/fundamentals/security-principles", title: "Security Principles", duration: "25 min", trackId: "cybersecurity", moduleId: "fundamentals", trackTitle: "Cybersecurity" },
  { id: "cybersecurity/fundamentals/authentication", title: "Authentication & Authorization", duration: "30 min", trackId: "cybersecurity", moduleId: "fundamentals", trackTitle: "Cybersecurity" },
  { id: "cybersecurity/web/owasp-top10", title: "OWASP Top 10", duration: "35 min", trackId: "cybersecurity", moduleId: "web", trackTitle: "Cybersecurity" },
  { id: "cybersecurity/web/secure-coding", title: "Secure Coding Practices", duration: "30 min", trackId: "cybersecurity", moduleId: "web", trackTitle: "Cybersecurity" },

  // System Architecture
  { id: "systems/architecture/microservices", title: "Microservices Architecture", duration: "30 min", trackId: "systems", moduleId: "architecture", trackTitle: "System Architecture" },
  { id: "systems/architecture/scalability", title: "Scalability Patterns", duration: "30 min", trackId: "systems", moduleId: "architecture", trackTitle: "System Architecture" },
  { id: "systems/architecture/reliability", title: "Reliability & Resilience", duration: "30 min", trackId: "systems", moduleId: "architecture", trackTitle: "System Architecture" },
  { id: "systems/architecture/event-driven", title: "Event-Driven Architecture", duration: "30 min", trackId: "systems", moduleId: "architecture", trackTitle: "System Architecture" },

  // Blockchain
  { id: "blockchain/fundamentals/blockchain-intro", title: "What is Blockchain?", duration: "20 min", trackId: "blockchain", moduleId: "fundamentals", trackTitle: "Blockchain" },
  { id: "blockchain/fundamentals/consensus", title: "Consensus Mechanisms", duration: "25 min", trackId: "blockchain", moduleId: "fundamentals", trackTitle: "Blockchain" },
  { id: "blockchain/smart-contracts/solidity-basics", title: "Smart Contracts & Solidity", duration: "30 min", trackId: "blockchain", moduleId: "smart-contracts", trackTitle: "Blockchain" },
  { id: "blockchain/smart-contracts/defi", title: "DeFi & Token Standards", duration: "25 min", trackId: "blockchain", moduleId: "smart-contracts", trackTitle: "Blockchain" },

  // IoT
  { id: "iot/fundamentals/iot-intro", title: "Introduction to IoT", duration: "20 min", trackId: "iot", moduleId: "fundamentals", trackTitle: "IoT" },
  { id: "iot/fundamentals/sensors-actuators", title: "Sensors & Actuators", duration: "25 min", trackId: "iot", moduleId: "fundamentals", trackTitle: "IoT" },
  { id: "iot/edge-computing/edge-intro", title: "Edge Computing", duration: "25 min", trackId: "iot", moduleId: "edge-computing", trackTitle: "IoT" },
  { id: "iot/edge-computing/iot-security", title: "IoT Security", duration: "30 min", trackId: "iot", moduleId: "edge-computing", trackTitle: "IoT" },

  // Big Data
  { id: "bigdata/fundamentals/bigdata-intro", title: "Introduction to Big Data", duration: "20 min", trackId: "bigdata", moduleId: "fundamentals", trackTitle: "Big Data" },
  { id: "bigdata/fundamentals/mapreduce", title: "MapReduce Paradigm", duration: "25 min", trackId: "bigdata", moduleId: "fundamentals", trackTitle: "Big Data" },
  { id: "bigdata/processing/spark-intro", title: "Apache Spark", duration: "30 min", trackId: "bigdata", moduleId: "processing", trackTitle: "Big Data" },
  { id: "bigdata/processing/data-pipelines", title: "Data Pipelines & ETL", duration: "25 min", trackId: "bigdata", moduleId: "processing", trackTitle: "Big Data" },
];

// Helper to get next uncompleted lesson
export function getNextLesson(completedLessons: string[]): LessonMetadata | null {
  return allLessons.find((lesson) => !completedLessons.includes(lesson.id)) || null;
}

// Helper to get lesson content by full ID
export function getLessonById(lessonId: string): LessonContent | null {
  return lessonsData[lessonId] || null;
}
