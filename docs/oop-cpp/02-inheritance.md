# Inheritance in C++

## Introduction

Inheritance allows derived classes to inherit properties and behaviors from base classes.

<div class="video-container">
  <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" allowfullscreen></iframe>
</div>

## Basic Inheritance

```cpp
#include <iostream>
#include <string>

class Animal {
protected:
    std::string name;

public:
    Animal(const std::string& name) : name(name) {}

    virtual std::string speak() const {
        return "Some sound";
    }

    std::string info() const {
        return "I am " + name;
    }
};

class Dog : public Animal {
public:
    Dog(const std::string& name) : Animal(name) {}

    std::string speak() const override {
        return "Woof!";
    }
};

class Cat : public Animal {
public:
    Cat(const std::string& name) : Animal(name) {}

    std::string speak() const override {
        return "Meow!";
    }
};

int main() {
    Dog dog("Buddy");
    Cat cat("Whiskers");

    std::cout << dog.info() << std::endl;   // I am Buddy
    std::cout << dog.speak() << std::endl;  // Woof!
    std::cout << cat.speak() << std::endl;  // Meow!

    return 0;
}
```
