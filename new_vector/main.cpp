#include <iostream>
#include <vector>



char *getData(){
	std::vector<char> * vec = new std::vector<char>();
	for(int i = 0; i < 100000; ++i){
		vec->push_back('a');
		vec->push_back('b');
		vec->push_back('c');
		vec->push_back('d');
		vec->push_back('e');
	}
	char *data = vec->data();
	delete vec;
	return data;
}


int main(){
	while(true){
		char *data = getData();
	}
	std::cout << "main:" << std::endl;
	return 0;
}