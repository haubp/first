#include <stdio.h>
#include <stdint.h>

int main(void)
{
	uint32_t a = 4294967295;
	uint32_t b = 4294967294;

	char r[16];

	sprintf(r, "%X", a);
	sprintf(r + 8, "%X", b);

	printf("%s\n", r);

	return 0;
}
