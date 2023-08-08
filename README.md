# Gnositc SVG
Storage of SVG Strings on GNOSIS with the ability to render the base64 encoded image string.

### Create Key With SVG
 - Name: CreateKeyWithSVG
 - Parameter 1 (string): Key Name 
 - Parameter 2 (string[]): SVG String Array

**Example SVG String Array**
```
["<style type=\"text/css\">.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style>"
,"<circle class=\"st0\" cx=\"16\" cy=\"12\" r=\"9\"/>"
,"<g><path class=\"st0\" d=\"M20.5,4.2C19.2,3.4,17.6,3,16,3s-3.2,0.4-4.5,1.2C14.2,5.8,16,8.7,16,12C16,8.7,17.8,5.8,20.5,4.2z\"/></g>"
,"<circle class=\"st0\" cx=\"12\" cy=\"12\" r=\"1\"/>"
,"<circle class=\"st0\" cx=\"20\" cy=\"12\" r=\"1\"/>"
,"<path class=\"st0\" d=\"M16.1,21c2.2,2.3,5.4,3.8,8.9,3.8h0V12\"/>"
,"<path class=\"st0\" d=\"M7,12c0,9,9.7,17,19,17\"/>"]

```
### Render Svg By Addr Key
- Name: RenderSvgByAddrKey
- Parameter 1 (address): eth or 0x address
- Parameter 2 (string): Key Name

**Example Render**
```
data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIzIiBIZWlnaHQ9IjQyMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9PC9zdHlsZT48Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIxNiIgY3k9IjEyIiByPSI5Ii8+PGc+PHBhdGggY2xhc3M9InN0MCIgZD0iTTIwLjUsNC4yQzE5LjIsMy40LDE3LjYsMywxNiwzcy0zLjIsMC40LTQuNSwxLjJDMTQuMiw1LjgsMTYsOC43LDE2LDEyQzE2LDguNywxNy44LDUuOCwyMC41LDQuMnoiLz48L2c+PGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iMTIiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjIwIiBjeT0iMTIiIHI9IjEiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuMSwyMWMyLjIsMi4zLDUuNCwzLjgsOC45LDMuOGgwVjEyIi8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTcsMTJjMCw5LDkuNywxNywxOSwxNyIvPjwvc3ZnPg==
```
 Paste In Browser:
 ![image](https://github.com/OwlWilderness/se-2/assets/98717833/277ea8c5-a445-4e1b-8971-22304bbc417a)

### Lock Key
locks key so it can not be edited ever again (key does not have to have any svg strings)
- Name: LockKey
- Parameter 1 (string) : Key Name
