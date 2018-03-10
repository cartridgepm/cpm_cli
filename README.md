# Cartridge Package Manager (CPM)

Cartridge Package Manager (CPM) `v0.0.1-alpha`, is a PM that uses Docker as its main engine, to ensure isolation of the running program from the host OS and the ability to carbon copy your programs from one OS to another.

## What's in it for you
You get to enjoy a clean OS that runs all programs you need without exhausting and slowing down your device with a lot of dependencies.

I have been using `CPM` to run Nodejs on my development environment for the past year and half, and I changed the OS multiple times without losing my configurations.   

## Install

for linux_x64
```
curl https://raw.githubusercontent.com/cartridgepm/cpm_cli/master/bin/cpm_linux_x64 -o /usr/local/bin/cpm && chmod +x /usr/local/bin/cpm
```
for macos_x64
```
curl https://raw.githubusercontent.com/cartridgepm/cpm_cli/master/bin/cpm_macos_x64 -o /usr/local/bin/cpm && chmod +x /usr/local/bin/cpm
```

## Usage
### Install a package
```
cpm -i node
```
check https://github.com/cartridgepm/packages for available packages and versions.

### Remove a package
```
cpm -r node
```

## Roadmap
1. Add more packages.
2. Save the packages config locally.
3. Export the installed packages into a file, to share etc...
4. Allow to sync packages between machines.  
5. A lot to come....

## Tested OS
* macOS Sierra v10.12.6
* ubuntu 16.04

# About me
I'm Mohamed Mahrous, a programer who wants to write one line of code to do everything :)
The project is still in an early stage, your contributions is welcome ❤️
Don't hesitate to contact me M.Mahrous <m.mahrous.94@gmail.com>
