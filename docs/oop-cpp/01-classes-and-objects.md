# Classes and Objects in C++

## Introduction

Classes in C++ provide the blueprint for creating objects with data members and member functions.

<div class="video-container">
  <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" allowfullscreen></iframe>
</div>

## Basic Class Definition

```cpp
#include <iostream>
#include <string>

class Dog {
private:
    std::string name;
    int age;

public:
    // Constructor
    Dog(const std::string& name, int age) : name(name), age(age) {}

    // Member functions
    std::string bark() const {
        return name + " says woof!";
    }

    std::string description() const {
        return name + " is " + std::to_string(age) + " years old";
    }

    // Getters
    std::string getName() const { return name; }
    int getAge() const { return age; }

    // Setters
    void setName(const std::string& newName) { name = newName; }
    void setAge(int newAge) { age = newAge; }
};

int main() {
    Dog buddy("Buddy", 3);
    Dog max("Max", 5);

    std::cout << buddy.bark() << std::endl;        // Buddy says woof!
    std::cout << max.description() << std::endl;   // Max is 5 years old

    return 0;
}
```
